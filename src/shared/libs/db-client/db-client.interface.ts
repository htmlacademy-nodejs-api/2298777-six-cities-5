export interface DbClient {
  connect(uri: string) : Promise<void>;
  disconnect(): Promise<void>;
}
