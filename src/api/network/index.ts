import {useSettingStore} from "../../store/setting";

import axios from "axios";
import {OpenAiRequestBody} from "./types";


class GptClient{
  private static instance: GptClient;

  public static getInstance(): GptClient {
    if (!GptClient.instance) {
      GptClient.instance = new GptClient();
    }
    return GptClient.instance;
  }

  async post(
    data: OpenAiRequestBody
  ){
    const url = useSettingStore.state.baseApiUrl + "/v1/chat/completions";
    const key  = useSettingStore.state.apiKey;

    data.stream = useSettingStore.state.config.stream

    if (data.stream){

      try {
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
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
                const json = line.substring(6).trim();
                if (json === "[DONE]") {
                  onResponse(finalResult);
                  break;
                }
                const result: openai.CreateChatCompletionDeltaResponse = JSON.parse(json);
                finalResult += result.choices[0]?.delta.content || "";
                onData(finalResult);
              }
            }
            pump(reader);
          });
        }

      }catch (err: any) {
        // onError(new Error(err));

      }

    }
  }
}
