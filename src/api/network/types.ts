
export type Role = "user" | "assistant" | "system" | "tool_call" | "tool" ;


interface OpenAiRequestBody {
  messages: ReqMessage[];
  stream: boolean;
  model: string;
  temperature?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  top_p: number;
  top_k?: number;
  stop?: string;
  max_tokens: number;
  tools?: Tool[];
  tool_choice?: string;
}

interface ReqMessage {
  role: string;
  content: string;
  name?: string;
  tool_calls?: any;
  tool_call_id?: string;
}

interface Tool {
  type: string;  //function
  function: Function;
}

interface ReqFunction {
  description: string;
  name: string;
  parameters: any;
}
//
interface OpenAiResponseBody {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choices[];
  usage: Usage;
  system_fingerprint: string;
}

interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

interface Choices {
  finish_reason: string;
  index: number;
  message?: RespMessage;
  delta: RespMessage;
}

interface RespMessage {
  role: string;
  content: string;
  tool_calls: ToolCalls[];
}

interface ToolCalls {
  index: number;
  id: string;
  type: string;
  function: RespFunction;
}

interface RespFunction {
  name: string;
  arguments: string;
}


export type {
  OpenAiRequestBody,
  ReqMessage,
  Tool,
  ReqFunction,
  OpenAiResponseBody,
  Choices,
  Usage,
  RespMessage,
  ToolCalls,
  RespFunction,
}
