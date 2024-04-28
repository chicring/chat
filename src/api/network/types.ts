
export type Role = "user" | "assistant" | "system" | "tool_call" | "tool" ;


interface OpenAiRequestBody {
  messages: Message[];
  stream: boolean;
  model: string;
  temperature: number;
  presence_penalty: number;
  frequency_penalty: number;
  top_p: number;
  top_k: number;
  stop: string;
  max_tokens: number;
  tools: Tool[];
  tool_choice: string;
}

interface Message {
  role: string;
  content: string;
  name: string;
  tool_calls: any;
  tool_call_id: string;
}

interface Tool {
  type: string;  //function
  function: Function;
}

interface Function {
  description: string;
  name: string;
  parameters: any;
}

export type { OpenAiRequestBody, Message, Tool, Function }
