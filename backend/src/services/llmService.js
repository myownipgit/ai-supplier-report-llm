const OpenAI = require('openai');

class LLMService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.model = process.env.LLM_MODEL || 'gpt-3.5-turbo';
    this.temperature = parseFloat(process.env.LLM_TEMPERATURE) || 0.3;
    
    // System prompts for different procurement contexts
    this.systemPrompts = {
      procurement_manager: `You are an AI assistant specialized in procurement management and supplier analytics. 
        You help analyze supplier data, identify consolidation opportunities, assess risks, and provide spend analytics.
        Always provide actionable insights and recommendations based on the data provided.
        
        Your key capabilities include:
        1. Consolidation Analysis: Identify opportunities to consolidate suppliers and reduce costs
        2. Supplier Risk Assessment: Evaluate supplier risks across various dimensions
        3. Spend Analytics: Analyze spending patterns and trends
        4. General Procurement Guidance: Provide strategic procurement advice
        
        When responding:
        - Be concise but comprehensive
        - Use data-driven insights
        - Provide specific recommendations
        - Structure responses clearly with headers when appropriate
        - Include relevant metrics and KPIs`,
        
      general: `You are an AI assistant for procurement analytics. Help users understand their supplier data,
        spending patterns, and procurement opportunities through natural language queries.`
    };
  }

  /**
   * Analyze user intent and extract entities from natural language query
   */
  async analyzeIntent(userQuery, context = {}) {
    try {
      const analysisPrompt = `
        Analyze this procurement-related query and extract the following:
        
        Query: "${userQuery}"
        
        Please respond with a JSON object containing:
        {
          "intent": "consolidation|risk_assessment|spend_analytics|general_query",
          "entities": {
            "suppliers": ["list of supplier names mentioned"],
            "categories": ["procurement categories mentioned"],
            "time_periods": ["time periods mentioned"],
            "metrics": ["KPIs or metrics mentioned"],
            "locations": ["geographic regions mentioned"]
          },
          "confidence": 0.0-1.0,
          "query_type": "analysis|report|comparison|trend|forecast|other",
          "suggested_response_format": "text|table|chart|summary"
        }
        
        Examples:
        - "Show consolidation opportunities in office supplies" → intent: "consolidation", entities: {categories: ["office supplies"]}
        - "What are supplier risks in APAC region?" → intent: "risk_assessment", entities: {locations: ["APAC"]}
        - "Compare Q1 vs Q2 IT spending" → intent: "spend_analytics", entities: {categories: ["IT"], time_periods: ["Q1", "Q2"]}
      `;

      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: 'You are an expert at analyzing procurement queries and extracting structured information. Always respond with valid JSON.' },
          { role: 'user', content: analysisPrompt }
        ],
        temperature: 0.1, // Low temperature for consistent structure
        max_tokens: 500
      });

      const analysis = JSON.parse(response.choices[0].message.content);
      return analysis;
    } catch (error) {
      console.error('Intent analysis error:', error);
      // Fallback analysis
      return {
        intent: this.detectIntentFallback(userQuery),
        entities: this.extractEntitiesFallback(userQuery),
        confidence: 0.5,
        query_type: 'general',
        suggested_response_format: 'text'
      };
    }
  }

  /**
   * Generate response based on intent, entities, and data
   */
  async generateResponse(userQuery, intent, entities, data, context = {}) {
    try {
      const systemPrompt = this.systemPrompts[context.role] || this.systemPrompts.general;
      
      const responsePrompt = `
        User Query: "${userQuery}"
        Intent: ${intent}
        Extracted Entities: ${JSON.stringify(entities)}
        
        Relevant Data:
        ${JSON.stringify(data, null, 2)}
        
        Based on the user's query and the provided data, generate a comprehensive response that:
        1. Directly answers the user's question
        2. Provides actionable insights
        3. Includes relevant metrics and trends
        4. Suggests next steps or follow-up actions
        
        If the data shows opportunities for improvement, highlight them.
        If there are risks, explain them clearly with mitigation strategies.
        Be specific and use the actual data in your response.
      `;

      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: responsePrompt }
        ],
        temperature: this.temperature,
        max_tokens: 1000
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Response generation error:', error);
      throw new Error('Failed to generate LLM response');
    }
  }

  /**
   * Fallback intent detection using simple keyword matching
   */
  detectIntentFallback(query) {
    const queryLower = query.toLowerCase();
    
    if (queryLower.includes('consolidat') || queryLower.includes('merge') || queryLower.includes('combine')) {
      return 'consolidation';
    }
    if (queryLower.includes('risk') || queryLower.includes('threat') || queryLower.includes('danger')) {
      return 'risk_assessment';
    }
    if (queryLower.includes('spend') || queryLower.includes('cost') || queryLower.includes('budget') || queryLower.includes('analytic')) {
      return 'spend_analytics';
    }
    
    return 'general_query';
  }

  /**
   * Fallback entity extraction using simple patterns
   */
  extractEntitiesFallback(query) {
    const entities = {
      suppliers: [],
      categories: [],
      time_periods: [],
      metrics: [],
      locations: []
    };

    // Simple pattern matching for common entities
    const timePatterns = /\b(Q[1-4]|quarter|month|year|2024|2025|january|february|march|april|may|june|july|august|september|october|november|december)\b/gi;
    const timeMatches = query.match(timePatterns);
    if (timeMatches) {
      entities.time_periods = [...new Set(timeMatches.map(m => m.toLowerCase()))];
    }

    const locationPatterns = /\b(APAC|EMEA|Americas|Europe|Asia|North America|South America|US|UK|China|India)\b/gi;
    const locationMatches = query.match(locationPatterns);
    if (locationMatches) {
      entities.locations = [...new Set(locationMatches)];
    }

    return entities;
  }

  /**
   * Health check for LLM service
   */
  async healthCheck() {
    try {
      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [{ role: 'user', content: 'Hello' }],
        max_tokens: 10
      });
      
      return {
        status: 'healthy',
        model: this.model,
        response_time: Date.now()
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message
      };
    }
  }
}

module.exports = LLMService;
