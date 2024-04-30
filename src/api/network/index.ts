
import axios from "axios";
import {OpenAiRequestBody, OpenAiResponseBody} from "./types";

export type DataCallback = (data: string) => void;
export type ErrorCallback = (error: Error) => void;
export type ResponseCallback = (response: string) => void;

class GptClient{
  private static instance: GptClient;

  public static getInstance(): GptClient {
    if (!GptClient.instance) {
      GptClient.instance = new GptClient();
    }
    return GptClient.instance;
  }

  async post(
    data: OpenAiRequestBody,
    onData: DataCallback,
    onResponse: ResponseCallback,
    onError: ErrorCallback
  ){

    const decoder = new TextDecoder("utf-8");

    const url = "http://hk.hjong.cn:8080/v1/chat/completions";

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + "95aninjv.1"
    };


    if (data.stream){

      try {
        fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(data),
        }).then(response => {
          if (response.ok){
            const reader = response.body!.getReader();
            pump(reader)
          }
        });
        let finalResult = "";
        function pump(reader: any) {
          reader.read().then(({ value, done }: { value: Uint8Array; done: boolean }) => {
            if (done) {
              return;
            }
            const text = decoder.decode(value);
            const lines = text.split("\n");
            for (const line of lines) {
              if (line.length > 0) {
                const json = line.substring(5).trim();
                if (json === "[DONE]") {
                  onResponse(finalResult);
                  break;
                }
                const result: OpenAiResponseBody = JSON.parse(json);
                finalResult += result.choices[0]?.delta.content || "";
                onData(finalResult);
              }
            }
            pump(reader);
          });
        }

      }catch (err: any) {
        onError(new Error(err));
      }

    }else {
      try {
        const response = await axios.post(url, data, {
          headers,
        });
        const result: OpenAiResponseBody = response.data;
        onResponse(result.choices[0].message?.content!);
      } catch (err: any) {
        onError(new Error(err));
      }
    }
  }
}

export default GptClient;
