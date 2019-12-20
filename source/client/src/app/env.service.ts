import { Injectable } from "@angular/core";

@Injectable()
export class EnvService {
  // The values that are defined here are the default values that can
  // be overridden by env.js

  // API url
  public apiUrl = "";
  // LoggerUrl
  public loggerUrl = "";
  public NODE_ENV = "";

  // Whether or not to enable debug mode
  public enableDebug = true;

  constructor() {}
}
