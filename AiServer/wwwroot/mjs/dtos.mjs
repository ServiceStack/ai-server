/* Options:
Date: 2024-08-04 23:20:48
Version: 8.31
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: https://localhost:5005

//AddServiceStackTypes: True
//AddDocAnnotations: True
//AddDescriptionAsComments: True
//IncludeTypes: 
//ExcludeTypes: 
//DefaultImports: 
*/

"use strict";
/** @typedef {'euler'|'euler_cfg_pp'|'euler_ancestral'|'euler_ancestral_cfg_pp'|'huen'|'huenpp2'|'dpm_2'|'dpm_2_ancestral'|'lms'|'dpm_fast'|'dpm_adaptive'|'dpmpp_2s_ancestral'|'dpmpp_sde'|'dpmpp_sde_gpu'|'dpmpp_2m'|'dpmpp_2m_sde'|'dpmpp_2m_sde_gpu'|'dpmpp_3m_sde'|'dpmpp_3m_sde_gpu'|'ddpm'|'lcm'|'ddim'|'uni_pc'|'uni_pc_bh2'} */
export var ComfySampler;
(function (ComfySampler) {
    ComfySampler["euler"] = "euler"
    ComfySampler["euler_cfg_pp"] = "euler_cfg_pp"
    ComfySampler["euler_ancestral"] = "euler_ancestral"
    ComfySampler["euler_ancestral_cfg_pp"] = "euler_ancestral_cfg_pp"
    ComfySampler["huen"] = "huen"
    ComfySampler["huenpp2"] = "huenpp2"
    ComfySampler["dpm_2"] = "dpm_2"
    ComfySampler["dpm_2_ancestral"] = "dpm_2_ancestral"
    ComfySampler["lms"] = "lms"
    ComfySampler["dpm_fast"] = "dpm_fast"
    ComfySampler["dpm_adaptive"] = "dpm_adaptive"
    ComfySampler["dpmpp_2s_ancestral"] = "dpmpp_2s_ancestral"
    ComfySampler["dpmpp_sde"] = "dpmpp_sde"
    ComfySampler["dpmpp_sde_gpu"] = "dpmpp_sde_gpu"
    ComfySampler["dpmpp_2m"] = "dpmpp_2m"
    ComfySampler["dpmpp_2m_sde"] = "dpmpp_2m_sde"
    ComfySampler["dpmpp_2m_sde_gpu"] = "dpmpp_2m_sde_gpu"
    ComfySampler["dpmpp_3m_sde"] = "dpmpp_3m_sde"
    ComfySampler["dpmpp_3m_sde_gpu"] = "dpmpp_3m_sde_gpu"
    ComfySampler["ddpm"] = "ddpm"
    ComfySampler["lcm"] = "lcm"
    ComfySampler["ddim"] = "ddim"
    ComfySampler["uni_pc"] = "uni_pc"
    ComfySampler["uni_pc_bh2"] = "uni_pc_bh2"
})(ComfySampler || (ComfySampler = {}));
/** @typedef {number} */
export var ComfyTaskType;
(function (ComfyTaskType) {
    ComfyTaskType[ComfyTaskType["TextToImage"] = 1] = "TextToImage"
    ComfyTaskType[ComfyTaskType["ImageToImage"] = 2] = "ImageToImage"
    ComfyTaskType[ComfyTaskType["ImageToImageUpscale"] = 3] = "ImageToImageUpscale"
    ComfyTaskType[ComfyTaskType["ImageToImageWithMask"] = 4] = "ImageToImageWithMask"
    ComfyTaskType[ComfyTaskType["ImageToText"] = 5] = "ImageToText"
    ComfyTaskType[ComfyTaskType["TextToAudio"] = 6] = "TextToAudio"
    ComfyTaskType[ComfyTaskType["TextToSpeech"] = 7] = "TextToSpeech"
    ComfyTaskType[ComfyTaskType["SpeechToText"] = 8] = "SpeechToText"
})(ComfyTaskType || (ComfyTaskType = {}));
export class ComfyApiModelSettings {
    /** @param {{id?:number,comfyApiModelId?:number,cfgScale?:number,scheduler?:string,sampler?:ComfySampler,width?:number,height?:number,steps?:number,negativePrompt?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {number} */
    comfyApiModelId;
    /** @type {?number} */
    cfgScale;
    /** @type {?string} */
    scheduler;
    /** @type {?ComfySampler} */
    sampler;
    /** @type {?number} */
    width;
    /** @type {?number} */
    height;
    /** @type {?number} */
    steps;
    /** @type {?string} */
    negativePrompt;
}
export class ComfyFileInput {
    /** @param {{name?:string,type?:string,subfolder?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    name;
    /** @type {string} */
    type;
    /** @type {string} */
    subfolder;
}
/** @typedef {'red'|'blue'|'green'|'alpha'} */
export var ComfyMaskSource;
(function (ComfyMaskSource) {
    ComfyMaskSource["red"] = "red"
    ComfyMaskSource["blue"] = "blue"
    ComfyMaskSource["green"] = "green"
    ComfyMaskSource["alpha"] = "alpha"
})(ComfyMaskSource || (ComfyMaskSource = {}));
export class QueryBase {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?number} */
    skip;
    /** @type {?number} */
    take;
    /** @type {string} */
    orderBy;
    /** @type {string} */
    orderByDesc;
    /** @type {string} */
    include;
    /** @type {string} */
    fields;
    /** @type {{ [index: string]: string; }} */
    meta;
}
/** @typedef T {any} */
export class QueryDb extends QueryBase {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
}
export class ResponseError {
    /** @param {{errorCode?:string,fieldName?:string,message?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    errorCode;
    /** @type {string} */
    fieldName;
    /** @type {string} */
    message;
    /** @type {{ [index: string]: string; }} */
    meta;
}
export class ResponseStatus {
    /** @param {{errorCode?:string,message?:string,stackTrace?:string,errors?:ResponseError[],meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    errorCode;
    /** @type {string} */
    message;
    /** @type {string} */
    stackTrace;
    /** @type {ResponseError[]} */
    errors;
    /** @type {{ [index: string]: string; }} */
    meta;
}
export class TaskBase {
    /** @param {{id?:number,model?:string,provider?:string,refId?:string,tag?:string,replyTo?:string,createdDate?:string,createdBy?:string,worker?:string,workerIp?:string,requestId?:string,startedDate?:string,completedDate?:string,durationMs?:number,retryLimit?:number,retries?:number,notificationDate?:string,errorCode?:string,error?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    model;
    /** @type {?string} */
    provider;
    /** @type {?string} */
    refId;
    /** @type {?string} */
    tag;
    /** @type {?string} */
    replyTo;
    /** @type {string} */
    createdDate;
    /** @type {string} */
    createdBy;
    /** @type {?string} */
    worker;
    /** @type {?string} */
    workerIp;
    /** @type {?string} */
    requestId;
    /** @type {?string} */
    startedDate;
    /** @type {?string} */
    completedDate;
    /** @type {number} */
    durationMs;
    /** @type {?number} */
    retryLimit;
    /** @type {number} */
    retries;
    /** @type {?string} */
    notificationDate;
    /** @type {?string} */
    errorCode;
    /** @type {?ResponseStatus} */
    error;
}
export class ComfyWorkflowRequest {
    /** @param {{model?:string,steps?:number,batchSize?:number,seed?:number,positivePrompt?:string,negativePrompt?:string,image?:ComfyFileInput,speech?:ComfyFileInput,mask?:ComfyFileInput,imageInput?:string,speechInput?:string,maskInput?:string,sampler?:ComfySampler,scheduler?:string,cfgScale?:number,denoise?:number,upscaleModel?:string,width?:number,height?:number,taskType?:ComfyTaskType,clip?:string,sampleLength?:number,maskChannel?:ComfyMaskSource}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    model;
    /** @type {?number} */
    steps;
    /** @type {number} */
    batchSize;
    /** @type {?number} */
    seed;
    /** @type {?string} */
    positivePrompt;
    /** @type {?string} */
    negativePrompt;
    /** @type {?ComfyFileInput} */
    image;
    /** @type {?ComfyFileInput} */
    speech;
    /** @type {?ComfyFileInput} */
    mask;
    /** @type {?string} */
    imageInput;
    /** @type {?string} */
    speechInput;
    /** @type {?string} */
    maskInput;
    /** @type {?ComfySampler} */
    sampler;
    /** @type {?string} */
    scheduler;
    /** @type {?number} */
    cfgScale;
    /** @type {?number} */
    denoise;
    /** @type {?string} */
    upscaleModel;
    /** @type {?number} */
    width;
    /** @type {?number} */
    height;
    /** @type {ComfyTaskType} */
    taskType;
    /** @type {?string} */
    clip;
    /** @type {?number} */
    sampleLength;
    /** @type {ComfyMaskSource} */
    maskChannel;
}
export class NodeError {
    constructor(init) { Object.assign(this, init) }
}
export class ComfyWorkflowResponse {
    /** @param {{promptId?:string,number?:number,nodeErrors?:NodeError[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    promptId;
    /** @type {number} */
    number;
    /** @type {NodeError[]} */
    nodeErrors;
}
export class ComfyFileOutput {
    /** @param {{filename?:string,type?:string,subfolder?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    filename;
    /** @type {string} */
    type;
    /** @type {string} */
    subfolder;
}
export class ComfyTextOutput {
    /** @param {{text?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    text;
}
export class ComfyOutput {
    /** @param {{files?:ComfyFileOutput[],texts?:ComfyTextOutput[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {ComfyFileOutput[]} */
    files;
    /** @type {ComfyTextOutput[]} */
    texts;
}
export class ComfyWorkflowStatus {
    /** @param {{statusMessage?:string,error?:string,completed?:boolean,outputs?:ComfyOutput[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    statusMessage;
    /** @type {?string} */
    error;
    /** @type {boolean} */
    completed;
    /** @type {ComfyOutput[]} */
    outputs;
}
export class ComfyGenerationTask extends TaskBase {
    /** @param {{request?:ComfyWorkflowRequest,response?:ComfyWorkflowResponse,status?:ComfyWorkflowStatus,taskType?:ComfyTaskType,workflowTemplate?:string,id?:number,model?:string,provider?:string,refId?:string,tag?:string,replyTo?:string,createdDate?:string,createdBy?:string,worker?:string,workerIp?:string,requestId?:string,startedDate?:string,completedDate?:string,durationMs?:number,retryLimit?:number,retries?:number,notificationDate?:string,errorCode?:string,error?:ResponseStatus}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {ComfyWorkflowRequest} */
    request;
    /** @type {?ComfyWorkflowResponse} */
    response;
    /** @type {?ComfyWorkflowStatus} */
    status;
    /** @type {ComfyTaskType} */
    taskType;
    /** @type {string} */
    workflowTemplate;
}
export class ComfyGenerationCompleted extends ComfyGenerationTask {
    /** @param {{request?:ComfyWorkflowRequest,response?:ComfyWorkflowResponse,status?:ComfyWorkflowStatus,taskType?:ComfyTaskType,workflowTemplate?:string,id?:number,model?:string,provider?:string,refId?:string,tag?:string,replyTo?:string,createdDate?:string,createdBy?:string,worker?:string,workerIp?:string,requestId?:string,startedDate?:string,completedDate?:string,durationMs?:number,retryLimit?:number,retries?:number,notificationDate?:string,errorCode?:string,error?:ResponseStatus}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
}
export class ComfyGenerationFailed extends ComfyGenerationTask {
    /** @param {{failedDate?:string,request?:ComfyWorkflowRequest,response?:ComfyWorkflowResponse,status?:ComfyWorkflowStatus,taskType?:ComfyTaskType,workflowTemplate?:string,id?:number,model?:string,provider?:string,refId?:string,tag?:string,replyTo?:string,createdDate?:string,createdBy?:string,worker?:string,workerIp?:string,requestId?:string,startedDate?:string,completedDate?:string,durationMs?:number,retryLimit?:number,retries?:number,notificationDate?:string,errorCode?:string,error?:ResponseStatus}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {string} */
    failedDate;
}
/** @typedef {'Queued'|'Started'|'Executed'|'Completed'|'Failed'|'Cancelled'} */
export var BackgroundJobState;
(function (BackgroundJobState) {
    BackgroundJobState["Queued"] = "Queued"
    BackgroundJobState["Started"] = "Started"
    BackgroundJobState["Executed"] = "Executed"
    BackgroundJobState["Completed"] = "Completed"
    BackgroundJobState["Failed"] = "Failed"
    BackgroundJobState["Cancelled"] = "Cancelled"
})(BackgroundJobState || (BackgroundJobState = {}));
export class BackgroundJob {
    /** @param {{id?:number,parentId?:number,refId?:string,worker?:string,tag?:string,callback?:string,createdDate?:string,createdBy?:string,requestId?:string,requestType?:string,command?:string,request?:string,requestBody?:string,requestUserId?:string,response?:string,responseBody?:string,state?:BackgroundJobState,startedDate?:string,completedDate?:string,notifiedDate?:string,durationMs?:number,timeoutSecs?:number,retryLimit?:number,attempts?:number,progress?:number,status?:string,logs?:string,lastActivityDate?:string,replyTo?:string,errorCode?:string,error?:ResponseStatus,args?:{ [index: string]: string; },meta?:{ [index: string]: string; },transient?:boolean}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {?number} */
    parentId;
    /** @type {?string} */
    refId;
    /** @type {?string} */
    worker;
    /** @type {?string} */
    tag;
    /** @type {?string} */
    callback;
    /** @type {string} */
    createdDate;
    /** @type {?string} */
    createdBy;
    /** @type {?string} */
    requestId;
    /** @type {string} */
    requestType;
    /** @type {?string} */
    command;
    /** @type {string} */
    request;
    /** @type {string} */
    requestBody;
    /** @type {?string} */
    requestUserId;
    /** @type {string} */
    response;
    /** @type {string} */
    responseBody;
    /** @type {BackgroundJobState} */
    state;
    /** @type {?string} */
    startedDate;
    /** @type {?string} */
    completedDate;
    /** @type {?string} */
    notifiedDate;
    /** @type {number} */
    durationMs;
    /** @type {?number} */
    timeoutSecs;
    /** @type {?number} */
    retryLimit;
    /** @type {number} */
    attempts;
    /** @type {?number} */
    progress;
    /** @type {?string} */
    status;
    /** @type {?string} */
    logs;
    /** @type {?string} */
    lastActivityDate;
    /** @type {?string} */
    replyTo;
    /** @type {?string} */
    errorCode;
    /** @type {?ResponseStatus} */
    error;
    /** @type {?{ [index: string]: string; }} */
    args;
    /** @type {?{ [index: string]: string; }} */
    meta;
    /** @type {boolean} */
    transient;
}
export class CompletedJob extends BackgroundJob {
    /** @param {{id?:number,parentId?:number,refId?:string,worker?:string,tag?:string,callback?:string,createdDate?:string,createdBy?:string,requestId?:string,requestType?:string,command?:string,request?:string,requestBody?:string,requestUserId?:string,response?:string,responseBody?:string,state?:BackgroundJobState,startedDate?:string,completedDate?:string,notifiedDate?:string,durationMs?:number,timeoutSecs?:number,retryLimit?:number,attempts?:number,progress?:number,status?:string,logs?:string,lastActivityDate?:string,replyTo?:string,errorCode?:string,error?:ResponseStatus,args?:{ [index: string]: string; },meta?:{ [index: string]: string; },transient?:boolean}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
}
export class FailedJob extends BackgroundJob {
    /** @param {{id?:number,parentId?:number,refId?:string,worker?:string,tag?:string,callback?:string,createdDate?:string,createdBy?:string,requestId?:string,requestType?:string,command?:string,request?:string,requestBody?:string,requestUserId?:string,response?:string,responseBody?:string,state?:BackgroundJobState,startedDate?:string,completedDate?:string,notifiedDate?:string,durationMs?:number,timeoutSecs?:number,retryLimit?:number,attempts?:number,progress?:number,status?:string,logs?:string,lastActivityDate?:string,replyTo?:string,errorCode?:string,error?:ResponseStatus,args?:{ [index: string]: string; },meta?:{ [index: string]: string; },transient?:boolean}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
}
export class OpenAiMessage {
    /** @param {{content?:string,role?:string,name?:string,tool_calls?:ToolCall[],tool_call_id?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The contents of the message. */
    content;
    /**
     * @type {string}
     * @description The role of the author of this message. Valid values are `system`, `user`, `assistant` and `tool`. */
    role;
    /**
     * @type {?string}
     * @description An optional name for the participant. Provides the model information to differentiate between participants of the same role. */
    name;
    /**
     * @type {?ToolCall[]}
     * @description The tool calls generated by the model, such as function calls. */
    tool_calls;
    /**
     * @type {?string}
     * @description Tool call that this message is responding to. */
    tool_call_id;
}
/** @typedef {'text'|'json_object'} */
export var ResponseFormat;
(function (ResponseFormat) {
    ResponseFormat["Text"] = "text"
    ResponseFormat["JsonObject"] = "json_object"
})(ResponseFormat || (ResponseFormat = {}));
export class OpenAiResponseFormat {
    /** @param {{response_format?:ResponseFormat}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {ResponseFormat}
     * @description An object specifying the format that the model must output. Compatible with GPT-4 Turbo and all GPT-3.5 Turbo models newer than gpt-3.5-turbo-1106. */
    response_format;
}
/** @typedef {'function'} */
export var OpenAiToolType;
(function (OpenAiToolType) {
    OpenAiToolType["Function"] = "function"
})(OpenAiToolType || (OpenAiToolType = {}));
export class OpenAiTools {
    /** @param {{type?:OpenAiToolType}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {OpenAiToolType}
     * @description The type of the tool. Currently, only function is supported. */
    type;
}
export class OpenAiChat {
    /** @param {{messages?:OpenAiMessage[],model?:string,frequency_penalty?:number,logit_bias?:{ [index: number]: number; },logprobs?:boolean,top_logprobs?:number,max_tokens?:number,n?:number,presence_penalty?:number,response_format?:OpenAiResponseFormat,seed?:number,stop?:string[],stream?:boolean,temperature?:number,top_p?:number,tools?:OpenAiTools[],user?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {OpenAiMessage[]}
     * @description A list of messages comprising the conversation so far. */
    messages;
    /**
     * @type {string}
     * @description ID of the model to use. See the model endpoint compatibility table for details on which models work with the Chat API */
    model;
    /**
     * @type {?number}
     * @description Number between `-2.0` and `2.0`. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim. */
    frequency_penalty;
    /**
     * @type {?{ [index: number]: number; }}
     * @description Modify the likelihood of specified tokens appearing in the completion. */
    logit_bias;
    /**
     * @type {?boolean}
     * @description Whether to return log probabilities of the output tokens or not. If true, returns the log probabilities of each output token returned in the content of message. */
    logprobs;
    /**
     * @type {?number}
     * @description An integer between 0 and 20 specifying the number of most likely tokens to return at each token position, each with an associated log probability. logprobs must be set to true if this parameter is used. */
    top_logprobs;
    /**
     * @type {?number}
     * @description The maximum number of tokens that can be generated in the chat completion. */
    max_tokens;
    /**
     * @type {?number}
     * @description How many chat completion choices to generate for each input message. Note that you will be charged based on the number of generated tokens across all of the choices. Keep `n` as `1` to minimize costs. */
    n;
    /**
     * @type {?number}
     * @description Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics. */
    presence_penalty;
    /**
     * @type {?OpenAiResponseFormat}
     * @description An object specifying the format that the model must output. Compatible with GPT-4 Turbo and all GPT-3.5 Turbo models newer than `gpt-3.5-turbo-1106`. Setting Type to ResponseFormat.JsonObject enables JSON mode, which guarantees the message the model generates is valid JSON. */
    response_format;
    /**
     * @type {?number}
     * @description This feature is in Beta. If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. Determinism is not guaranteed, and you should refer to the system_fingerprint response parameter to monitor changes in the backend. */
    seed;
    /**
     * @type {?string[]}
     * @description Up to 4 sequences where the API will stop generating further tokens. */
    stop;
    /**
     * @type {?boolean}
     * @description If set, partial message deltas will be sent, like in ChatGPT. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a `data: [DONE]` message. */
    stream;
    /**
     * @type {?number}
     * @description What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. */
    temperature;
    /**
     * @type {number}
     * @description An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. */
    top_p;
    /**
     * @type {?OpenAiTools[]}
     * @description A list of tools the model may call. Currently, only functions are supported as a tool. Use this to provide a list of functions the model may generate JSON inputs for. A max of 128 functions are supported. */
    tools;
    /**
     * @type {?string}
     * @description A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. */
    user;
}
export class ApiModel {
    /** @param {{id?:number,name?:string,parameters?:string,contextSize?:number,website?:string,developer?:string,notes?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    name;
    /** @type {?string} */
    parameters;
    /** @type {?number} */
    contextSize;
    /** @type {?string} */
    website;
    /** @type {?string} */
    developer;
    /** @type {?string} */
    notes;
}
export class Property {
    /** @param {{name?:string,value?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    name;
    /** @type {string} */
    value;
}
export class ApiProviderModel {
    /** @param {{id?:number,apiProviderId?:number,model?:string,apiModel?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {number} */
    apiProviderId;
    /** @type {string} */
    model;
    /** @type {?string} */
    apiModel;
}
/** @typedef {'Minute'|'Hourly'|'Daily'|'Monthly'} */
export var PeriodicFrequency;
(function (PeriodicFrequency) {
    PeriodicFrequency["Minute"] = "Minute"
    PeriodicFrequency["Hourly"] = "Hourly"
    PeriodicFrequency["Daily"] = "Daily"
    PeriodicFrequency["Monthly"] = "Monthly"
})(PeriodicFrequency || (PeriodicFrequency = {}));
export class ComfyApiProvider {
    /** @param {{id?:number,name?:string,apiKey?:string,apiKeyHeader?:string,apiBaseUrl?:string,heartbeatUrl?:string,taskWorkflows?:{ [index: string]: string; },concurrency?:number,priority?:number,enabled?:boolean,offlineDate?:string,createdDate?:string,models?:ComfyApiProviderModel[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    name;
    /** @type {?string} */
    apiKey;
    /** @type {?string} */
    apiKeyHeader;
    /** @type {?string} */
    apiBaseUrl;
    /** @type {?string} */
    heartbeatUrl;
    /** @type {?{ [index: string]: string; }} */
    taskWorkflows;
    /** @type {number} */
    concurrency;
    /** @type {number} */
    priority;
    /** @type {boolean} */
    enabled;
    /** @type {?string} */
    offlineDate;
    /** @type {string} */
    createdDate;
    /** @type {?ComfyApiProviderModel[]} */
    models;
}
export class ComfyApiModel {
    /** @param {{id?:number,name?:string,description?:string,tags?:string,filename?:string,downloadUrl?:string,iconUrl?:string,url?:string,createdDate?:string,modelSettings?:ComfyApiModelSettings}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    name;
    /** @type {?string} */
    description;
    /** @type {?string} */
    tags;
    /** @type {string} */
    filename;
    /** @type {string} */
    downloadUrl;
    /** @type {string} */
    iconUrl;
    /** @type {string} */
    url;
    /** @type {string} */
    createdDate;
    /** @type {?ComfyApiModelSettings} */
    modelSettings;
}
export class ComfyApiProviderModel {
    /** @param {{id?:number,comfyApiProviderId?:number,comfyApiModelId?:number,comfyApiProvider?:ComfyApiProvider,comfyApiModel?:ComfyApiModel}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {number} */
    comfyApiProviderId;
    /** @type {number} */
    comfyApiModelId;
    /** @type {ComfyApiProvider} */
    comfyApiProvider;
    /** @type {ComfyApiModel} */
    comfyApiModel;
}
/** @typedef {number} */
export var TaskType;
(function (TaskType) {
    TaskType[TaskType["OpenAiChat"] = 1] = "OpenAiChat"
    TaskType[TaskType["Comfy"] = 2] = "Comfy"
})(TaskType || (TaskType = {}));
export class ApiType {
    /** @param {{id?:number,name?:string,website?:string,apiBaseUrl?:string,heartbeatUrl?:string,openAiProvider?:string,taskPaths?:{ [index: string]: string; },apiModels?:{ [index: string]: string; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    name;
    /** @type {string} */
    website;
    /** @type {string} */
    apiBaseUrl;
    /** @type {?string} */
    heartbeatUrl;
    /** @type {?string} */
    openAiProvider;
    /** @type {{ [index: string]: string; }} */
    taskPaths;
    /** @type {{ [index: string]: string; }} */
    apiModels;
}
export class ApiProvider {
    /** @param {{id?:number,name?:string,apiTypeId?:number,apiKey?:string,apiKeyHeader?:string,apiBaseUrl?:string,heartbeatUrl?:string,taskPaths?:{ [index: string]: string; },concurrency?:number,priority?:number,enabled?:boolean,offlineDate?:string,createdDate?:string,apiType?:ApiType,models?:ApiProviderModel[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    name;
    /** @type {number} */
    apiTypeId;
    /** @type {?string} */
    apiKey;
    /** @type {?string} */
    apiKeyHeader;
    /** @type {?string} */
    apiBaseUrl;
    /** @type {?string} */
    heartbeatUrl;
    /** @type {?{ [index: string]: string; }} */
    taskPaths;
    /** @type {number} */
    concurrency;
    /** @type {number} */
    priority;
    /** @type {boolean} */
    enabled;
    /** @type {?string} */
    offlineDate;
    /** @type {string} */
    createdDate;
    /** @type {ApiType} */
    apiType;
    /** @type {ApiProviderModel[]} */
    models;
}
export class ComfySummary {
    /** @param {{id?:number,type?:ComfyTaskType,model?:string,provider?:string,refId?:string,tag?:string,durationMs?:number,createdDate?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {ComfyTaskType} */
    type;
    /** @type {string} */
    model;
    /** @type {?string} */
    provider;
    /** @type {?string} */
    refId;
    /** @type {?string} */
    tag;
    /** @type {number} */
    durationMs;
    /** @type {string} */
    createdDate;
}
export class TaskSummary {
    /** @param {{id?:number,type?:TaskType,model?:string,provider?:string,refId?:string,tag?:string,promptTokens?:number,completionTokens?:number,durationMs?:number,createdDate?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {TaskType} */
    type;
    /** @type {string} */
    model;
    /** @type {?string} */
    provider;
    /** @type {?string} */
    refId;
    /** @type {?string} */
    tag;
    /** @type {number} */
    promptTokens;
    /** @type {number} */
    completionTokens;
    /** @type {number} */
    durationMs;
    /** @type {string} */
    createdDate;
}
export class ComfyHostedFileOutput {
    /** @param {{url?:string,fileName?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    url;
    /** @type {string} */
    fileName;
}
export class AiServerHostedComfyFile {
    /** @param {{url?:string,fileName?:string,contentType?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    url;
    /** @type {string} */
    fileName;
    /** @type {string} */
    contentType;
}
export class PageStats {
    /** @param {{label?:string,total?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    label;
    /** @type {number} */
    total;
}
export class WorkerStats {
    /** @param {{name?:string,queued?:number,received?:number,completed?:number,retries?:number,failed?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    name;
    /** @type {number} */
    queued;
    /** @type {number} */
    received;
    /** @type {number} */
    completed;
    /** @type {number} */
    retries;
    /** @type {number} */
    failed;
}
export class ChoiceMessage {
    /** @param {{content?:string,tool_calls?:ToolCall[],role?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The contents of the message. */
    content;
    /**
     * @type {ToolCall[]}
     * @description The tool calls generated by the model, such as function calls. */
    tool_calls;
    /**
     * @type {string}
     * @description The role of the author of this message. */
    role;
}
export class Choice {
    /** @param {{finish_reason?:string,index?:number,message?:ChoiceMessage}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The reason the model stopped generating tokens. This will be stop if the model hit a natural stop point or a provided stop sequence, length if the maximum number of tokens specified in the request was reached, content_filter if content was omitted due to a flag from our content filters, tool_calls if the model called a tool */
    finish_reason;
    /**
     * @type {number}
     * @description The index of the choice in the list of choices. */
    index;
    /**
     * @type {ChoiceMessage}
     * @description A chat completion message generated by the model. */
    message;
}
export class OpenAiUsage {
    /** @param {{completion_tokens?:number,prompt_tokens?:number,total_tokens?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {number}
     * @description Number of tokens in the generated completion. */
    completion_tokens;
    /**
     * @type {number}
     * @description Number of tokens in the prompt. */
    prompt_tokens;
    /**
     * @type {number}
     * @description Total number of tokens used in the request (prompt + completion). */
    total_tokens;
}
export class SummaryStats {
    /** @param {{name?:string,totalTasks?:number,totalPromptTokens?:number,totalCompletionTokens?:number,totalMinutes?:number,tokensPerSecond?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    name;
    /** @type {number} */
    totalTasks;
    /** @type {number} */
    totalPromptTokens;
    /** @type {number} */
    totalCompletionTokens;
    /** @type {number} */
    totalMinutes;
    /** @type {number} */
    tokensPerSecond;
}
export class ToolCall {
    /** @param {{id?:string,type?:string,function?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The ID of the tool call. */
    id;
    /**
     * @type {string}
     * @description The type of the tool. Currently, only `function` is supported. */
    type;
    /**
     * @type {string}
     * @description The function that the model called. */
    function;
}
export class QueueComfyWorkflowResponse {
    /** @param {{request?:ComfyWorkflowRequest,status?:ComfyWorkflowStatus,workflowResponse?:ComfyWorkflowResponse,promptId?:string,fileOutputs?:ComfyHostedFileOutput[],textOutputs?:ComfyTextOutput[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?ComfyWorkflowRequest} */
    request;
    /** @type {ComfyWorkflowStatus} */
    status;
    /** @type {ComfyWorkflowResponse} */
    workflowResponse;
    /** @type {string} */
    promptId;
    /** @type {ComfyHostedFileOutput[]} */
    fileOutputs;
    /** @type {ComfyTextOutput[]} */
    textOutputs;
}
export class ImportCivitAiModelResponse {
    /** @param {{model?:ComfyApiModel,provider?:ComfyApiProvider}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {ComfyApiModel} */
    model;
    /** @type {ComfyApiProvider} */
    provider;
}
export class ComfyAgentDownloadStatus {
    /** @param {{name?:string,progress?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    name;
    /** @type {?number} */
    progress;
}
export class DownloadComfyProviderModelResponse {
    /** @param {{downloadStatus?:ComfyAgentDownloadStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?ComfyAgentDownloadStatus} */
    downloadStatus;
}
export class GetComfyGenerationResponse {
    /** @param {{outputs?:AiServerHostedComfyFile[],result?:ComfyGenerationTask,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?AiServerHostedComfyFile[]} */
    outputs;
    /** @type {?ComfyGenerationTask} */
    result;
    /** @type {?ResponseStatus} */
    responseStatus;
}
export class ComfyTextToImageResponse {
    /** @param {{promptId?:string,request?:ComfyWorkflowRequest,images?:ComfyHostedFileOutput[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    promptId;
    /** @type {?ComfyWorkflowRequest} */
    request;
    /** @type {?ComfyHostedFileOutput[]} */
    images;
}
export class ComfyImageToTextResponse {
    /** @param {{promptId?:string,request?:ComfyWorkflowRequest,textOutput?:ComfyTextOutput}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    promptId;
    /** @type {?ComfyWorkflowRequest} */
    request;
    /** @type {?ComfyTextOutput} */
    textOutput;
}
export class ComfyImageToImageResponse {
    /** @param {{promptId?:string,request?:ComfyWorkflowRequest,images?:ComfyHostedFileOutput[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    promptId;
    /** @type {?ComfyWorkflowRequest} */
    request;
    /** @type {?ComfyHostedFileOutput[]} */
    images;
}
export class ComfyImageToImageUpscaleResponse {
    /** @param {{promptId?:string,request?:ComfyWorkflowRequest,images?:ComfyHostedFileOutput[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    promptId;
    /** @type {?ComfyWorkflowRequest} */
    request;
    /** @type {?ComfyHostedFileOutput[]} */
    images;
}
export class ComfyImageToImageWithMaskResponse {
    /** @param {{promptId?:string,request?:ComfyWorkflowRequest,images?:ComfyHostedFileOutput[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    promptId;
    /** @type {?ComfyWorkflowRequest} */
    request;
    /** @type {?ComfyHostedFileOutput[]} */
    images;
}
export class ComfyTextToSpeechResponse {
    /** @param {{promptId?:string,request?:ComfyWorkflowRequest,speech?:ComfyHostedFileOutput[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    promptId;
    /** @type {?ComfyWorkflowRequest} */
    request;
    /** @type {?ComfyHostedFileOutput[]} */
    speech;
}
export class ComfySpeechToTextResponse {
    /** @param {{promptId?:string,request?:ComfyWorkflowRequest,textOutput?:ComfyTextOutput}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    promptId;
    /** @type {?ComfyWorkflowRequest} */
    request;
    /** @type {?ComfyTextOutput} */
    textOutput;
}
export class ComfyTextToAudioResponse {
    /** @param {{promptId?:string,request?:ComfyWorkflowRequest,sounds?:ComfyHostedFileOutput[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    promptId;
    /** @type {?ComfyWorkflowRequest} */
    request;
    /** @type {?ComfyHostedFileOutput[]} */
    sounds;
}
/** @typedef T {any} */
export class QueryResponse {
    /** @param {{offset?:number,total?:number,results?:T[],meta?:{ [index: string]: string; },responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    offset;
    /** @type {number} */
    total;
    /** @type {T[]} */
    results;
    /** @type {{ [index: string]: string; }} */
    meta;
    /** @type {ResponseStatus} */
    responseStatus;
}
export class CreateComfyGenerationResponse {
    /** @param {{id?:number,refId?:string,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    refId;
    /** @type {?ResponseStatus} */
    responseStatus;
}
export class HelloResponse {
    /** @param {{result?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    result;
}
export class AdminDataResponse {
    /** @param {{pageStats?:PageStats[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {PageStats[]} */
    pageStats;
}
export class StringsResponse {
    /** @param {{results?:string[],meta?:{ [index: string]: string; },responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string[]} */
    results;
    /** @type {{ [index: string]: string; }} */
    meta;
    /** @type {ResponseStatus} */
    responseStatus;
}
export class GetWorkerStatsResponse {
    /** @param {{results?:WorkerStats[],responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {WorkerStats[]} */
    results;
    /** @type {?ResponseStatus} */
    responseStatus;
}
export class CreateOpenAiChatResponse {
    /** @param {{id?:number,refId?:string,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    refId;
    /** @type {?ResponseStatus} */
    responseStatus;
}
export class GetOpenAiChatResponse {
    /** @param {{result?:BackgroundJob,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?BackgroundJob} */
    result;
    /** @type {?ResponseStatus} */
    responseStatus;
}
export class GetActiveProvidersResponse {
    /** @param {{results?:ApiProvider[],responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {ApiProvider[]} */
    results;
    /** @type {?ResponseStatus} */
    responseStatus;
}
export class OpenAiChatResponse {
    /** @param {{id?:string,choices?:Choice[],created?:number,model?:string,system_fingerprint?:string,object?:string,usage?:OpenAiUsage}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description A unique identifier for the chat completion. */
    id;
    /**
     * @type {Choice[]}
     * @description A list of chat completion choices. Can be more than one if n is greater than 1. */
    choices;
    /**
     * @type {number}
     * @description The Unix timestamp (in seconds) of when the chat completion was created. */
    created;
    /**
     * @type {string}
     * @description The model used for the chat completion. */
    model;
    /**
     * @type {string}
     * @description This fingerprint represents the backend configuration that the model runs with. */
    system_fingerprint;
    /**
     * @type {string}
     * @description The object type, which is always chat.completion. */
    object;
    /**
     * @type {OpenAiUsage}
     * @description Usage statistics for the completion request. */
    usage;
}
export class CreateApiKeyResponse {
    /** @param {{id?:number,key?:string,name?:string,userId?:string,userName?:string,visibleKey?:string,createdDate?:string,expiryDate?:string,cancelledDate?:string,notes?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    key;
    /** @type {string} */
    name;
    /** @type {?string} */
    userId;
    /** @type {?string} */
    userName;
    /** @type {string} */
    visibleKey;
    /** @type {string} */
    createdDate;
    /** @type {?string} */
    expiryDate;
    /** @type {?string} */
    cancelledDate;
    /** @type {?string} */
    notes;
}
export class EmptyResponse {
    /** @param {{responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {ResponseStatus} */
    responseStatus;
}
export class StringResponse {
    /** @param {{result?:string,meta?:{ [index: string]: string; },responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    result;
    /** @type {{ [index: string]: string; }} */
    meta;
    /** @type {ResponseStatus} */
    responseStatus;
}
export class GetSummaryStatsResponse {
    /** @param {{providerStats?:SummaryStats[],modelStats?:SummaryStats[],monthStats?:SummaryStats[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {SummaryStats[]} */
    providerStats;
    /** @type {SummaryStats[]} */
    modelStats;
    /** @type {SummaryStats[]} */
    monthStats;
}
export class IdResponse {
    /** @param {{id?:string,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    id;
    /** @type {ResponseStatus} */
    responseStatus;
}
export class AuthenticateResponse {
    /** @param {{userId?:string,sessionId?:string,userName?:string,displayName?:string,referrerUrl?:string,bearerToken?:string,refreshToken?:string,refreshTokenExpiry?:string,profileUrl?:string,roles?:string[],permissions?:string[],responseStatus?:ResponseStatus,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    userId;
    /** @type {string} */
    sessionId;
    /** @type {string} */
    userName;
    /** @type {string} */
    displayName;
    /** @type {string} */
    referrerUrl;
    /** @type {string} */
    bearerToken;
    /** @type {string} */
    refreshToken;
    /** @type {?string} */
    refreshTokenExpiry;
    /** @type {string} */
    profileUrl;
    /** @type {string[]} */
    roles;
    /** @type {string[]} */
    permissions;
    /** @type {ResponseStatus} */
    responseStatus;
    /** @type {{ [index: string]: string; }} */
    meta;
}
export class QueueComfyWorkflow {
    /** @param {{model?:string,steps?:number,batchSize?:number,seed?:number,positivePrompt?:string,negativePrompt?:string,imageInput?:string,speechInput?:string,maskInput?:string,sampler?:ComfySampler,scheduler?:string,cfgScale?:number,denoise?:number,upscaleModel?:string,width?:number,height?:number,clip?:string,sampleLength?:number,taskType?:ComfyTaskType,refId?:string,provider?:string,replyTo?:string,tag?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    model;
    /** @type {?number} */
    steps;
    /** @type {?number} */
    batchSize;
    /** @type {?number} */
    seed;
    /** @type {?string} */
    positivePrompt;
    /** @type {?string} */
    negativePrompt;
    /** @type {?string} */
    imageInput;
    /** @type {?string} */
    speechInput;
    /** @type {?string} */
    maskInput;
    /** @type {?ComfySampler} */
    sampler;
    /** @type {?string} */
    scheduler;
    /** @type {?number} */
    cfgScale;
    /** @type {?number} */
    denoise;
    /** @type {?string} */
    upscaleModel;
    /** @type {?number} */
    width;
    /** @type {?number} */
    height;
    /** @type {?string} */
    clip;
    /** @type {?number} */
    sampleLength;
    /** @type {ComfyTaskType} */
    taskType;
    /** @type {?string} */
    refId;
    /** @type {?string} */
    provider;
    /** @type {?string} */
    replyTo;
    /** @type {?string} */
    tag;
    getTypeName() { return 'QueueComfyWorkflow' }
    getMethod() { return 'POST' }
    createResponse() { return new QueueComfyWorkflowResponse() }
}
export class ImportCivitAiModel {
    /** @param {{provider?:string,modelUrl?:string,settings?:ComfyApiModelSettings}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    provider;
    /** @type {string} */
    modelUrl;
    /** @type {?ComfyApiModelSettings} */
    settings;
    getTypeName() { return 'ImportCivitAiModel' }
    getMethod() { return 'POST' }
    createResponse() { return new ImportCivitAiModelResponse() }
}
export class DownloadComfyProviderModel {
    /** @param {{comfyApiProviderModelId?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?number} */
    comfyApiProviderModelId;
    getTypeName() { return 'DownloadComfyProviderModel' }
    getMethod() { return 'POST' }
    createResponse() { return new DownloadComfyProviderModelResponse() }
}
export class WaitForComfyGeneration {
    /** @param {{id?:number,refId?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?number} */
    id;
    /** @type {?string} */
    refId;
    getTypeName() { return 'WaitForComfyGeneration' }
    getMethod() { return 'POST' }
    createResponse() { return new GetComfyGenerationResponse() }
}
export class DownloadComfyFile {
    /** @param {{year?:number,month?:number,day?:number,fileName?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?number} */
    year;
    /** @type {?number} */
    month;
    /** @type {?number} */
    day;
    /** @type {?string} */
    fileName;
    getTypeName() { return 'DownloadComfyFile' }
    getMethod() { return 'GET' }
    createResponse() { return new Blob() }
}
export class ComfyTextToImage {
    /** @param {{seed?:number,cfgScale?:number,height?:number,width?:number,sampler?:ComfySampler,batchSize?:number,steps?:number,model?:string,positivePrompt?:string,negativePrompt?:string,scheduler?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    seed;
    /** @type {number} */
    cfgScale;
    /** @type {number} */
    height;
    /** @type {number} */
    width;
    /** @type {ComfySampler} */
    sampler;
    /** @type {number} */
    batchSize;
    /** @type {number} */
    steps;
    /** @type {string} */
    model;
    /** @type {string} */
    positivePrompt;
    /** @type {string} */
    negativePrompt;
    /** @type {?string} */
    scheduler;
    getTypeName() { return 'ComfyTextToImage' }
    getMethod() { return 'POST' }
    createResponse() { return new ComfyTextToImageResponse() }
}
export class ComfyImageToText {
    /** @param {{imageInput?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    imageInput;
    getTypeName() { return 'ComfyImageToText' }
    getMethod() { return 'POST' }
    createResponse() { return new ComfyImageToTextResponse() }
}
export class ComfyImageToImage {
    /** @param {{seed?:number,cfgScale?:number,sampler?:ComfySampler,steps?:number,batchSize?:number,denoise?:number,scheduler?:string,model?:string,positivePrompt?:string,negativePrompt?:string,imageInput?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    seed;
    /** @type {number} */
    cfgScale;
    /** @type {ComfySampler} */
    sampler;
    /** @type {number} */
    steps;
    /** @type {number} */
    batchSize;
    /** @type {number} */
    denoise;
    /** @type {?string} */
    scheduler;
    /** @type {string} */
    model;
    /** @type {string} */
    positivePrompt;
    /** @type {string} */
    negativePrompt;
    /** @type {?string} */
    imageInput;
    getTypeName() { return 'ComfyImageToImage' }
    getMethod() { return 'POST' }
    createResponse() { return new ComfyImageToImageResponse() }
}
export class ComfyImageToImageUpscale {
    /** @param {{upscaleModel?:string,image?:ComfyFileInput,imageInput?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    upscaleModel;
    /** @type {?ComfyFileInput} */
    image;
    /** @type {?string} */
    imageInput;
    getTypeName() { return 'ComfyImageToImageUpscale' }
    getMethod() { return 'POST' }
    createResponse() { return new ComfyImageToImageUpscaleResponse() }
}
export class ComfyImageToImageWithMask {
    /** @param {{seed?:number,cfgScale?:number,sampler?:ComfySampler,steps?:number,batchSize?:number,denoise?:number,scheduler?:string,model?:string,positivePrompt?:string,negativePrompt?:string,maskChannel?:ComfyMaskSource,imageInput?:string,maskInput?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    seed;
    /** @type {number} */
    cfgScale;
    /** @type {ComfySampler} */
    sampler;
    /** @type {number} */
    steps;
    /** @type {number} */
    batchSize;
    /** @type {number} */
    denoise;
    /** @type {?string} */
    scheduler;
    /** @type {string} */
    model;
    /** @type {string} */
    positivePrompt;
    /** @type {string} */
    negativePrompt;
    /** @type {ComfyMaskSource} */
    maskChannel;
    /** @type {?string} */
    imageInput;
    /** @type {?string} */
    maskInput;
    getTypeName() { return 'ComfyImageToImageWithMask' }
    getMethod() { return 'POST' }
    createResponse() { return new ComfyImageToImageWithMaskResponse() }
}
export class ComfyTextToSpeech {
    /** @param {{positivePrompt?:string,model?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    positivePrompt;
    /** @type {string} */
    model;
    getTypeName() { return 'ComfyTextToSpeech' }
    getMethod() { return 'POST' }
    createResponse() { return new ComfyTextToSpeechResponse() }
}
export class ComfySpeechToText {
    /** @param {{model?:string,speechInput?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    model;
    /** @type {?string} */
    speechInput;
    getTypeName() { return 'ComfySpeechToText' }
    getMethod() { return 'POST' }
    createResponse() { return new ComfySpeechToTextResponse() }
}
export class ComfyTextToAudio {
    /** @param {{clip?:string,model?:string,steps?:number,cfgScale?:number,seed?:number,sampler?:ComfySampler,scheduler?:string,positivePrompt?:string,negativePrompt?:string,sampleLength?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    clip;
    /** @type {?string} */
    model;
    /** @type {?number} */
    steps;
    /** @type {?number} */
    cfgScale;
    /** @type {?number} */
    seed;
    /** @type {?ComfySampler} */
    sampler;
    /** @type {?string} */
    scheduler;
    /** @type {string} */
    positivePrompt;
    /** @type {?string} */
    negativePrompt;
    /** @type {?number} */
    sampleLength;
    getTypeName() { return 'ComfyTextToAudio' }
    getMethod() { return 'POST' }
    createResponse() { return new ComfyTextToAudioResponse() }
}
export class ConfigureAndDownloadModel {
    /** @param {{name?:string,filename?:string,downloadUrl?:string,cfgScale?:number,scheduler?:string,sampler?:ComfySampler,width?:number,height?:number,steps?:number,negativePrompt?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    name;
    /** @type {string} */
    filename;
    /** @type {string} */
    downloadUrl;
    /** @type {?number} */
    cfgScale;
    /** @type {?string} */
    scheduler;
    /** @type {?ComfySampler} */
    sampler;
    /** @type {?number} */
    width;
    /** @type {?number} */
    height;
    /** @type {?number} */
    steps;
    /** @type {?string} */
    negativePrompt;
    getTypeName() { return 'ConfigureAndDownloadModel' }
    getMethod() { return 'POST' }
    createResponse() { return new ComfyAgentDownloadStatus() }
}
export class GetComfyGeneration {
    /** @param {{id?:number,refId?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?number} */
    id;
    /** @type {?string} */
    refId;
    getTypeName() { return 'GetComfyGeneration' }
    getMethod() { return 'POST' }
    createResponse() { return new GetComfyGenerationResponse() }
}
export class QueryCompletedComfyTasks extends QueryDb {
    /** @param {{db?:string,id?:number,refId?:string,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?string} */
    db;
    /** @type {?number} */
    id;
    /** @type {?string} */
    refId;
    getTypeName() { return 'QueryCompletedComfyTasks' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryFailedComfyTasks extends QueryDb {
    /** @param {{db?:string,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?string} */
    db;
    getTypeName() { return 'QueryFailedComfyTasks' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class CreateComfyGeneration {
    /** @param {{refId?:string,provider?:string,replyTo?:string,tag?:string,request?:ComfyWorkflowRequest}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    refId;
    /** @type {?string} */
    provider;
    /** @type {?string} */
    replyTo;
    /** @type {?string} */
    tag;
    /** @type {ComfyWorkflowRequest} */
    request;
    getTypeName() { return 'CreateComfyGeneration' }
    getMethod() { return 'POST' }
    createResponse() { return new CreateComfyGenerationResponse() }
}
export class FetchComfyGenerationRequests {
    /** @param {{models?:string[],provider?:string,take?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string[]} */
    models;
    /** @type {?string} */
    provider;
    /** @type {?number} */
    take;
    getTypeName() { return 'FetchComfyGenerationRequests' }
    getMethod() { return 'POST' }
    createResponse () { };
}
export class Hello {
    /** @param {{name?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    name;
    getTypeName() { return 'Hello' }
    getMethod() { return 'GET' }
    createResponse() { return new HelloResponse() }
}
export class AdminData {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'AdminData' }
    getMethod() { return 'GET' }
    createResponse() { return new AdminDataResponse() }
}
export class ActiveApiModels {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'ActiveApiModels' }
    getMethod() { return 'GET' }
    createResponse() { return new StringsResponse() }
}
export class GetWorkerStats {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'GetWorkerStats' }
    getMethod() { return 'GET' }
    createResponse() { return new GetWorkerStatsResponse() }
}
export class GetModelImage {
    /** @param {{model?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    model;
    getTypeName() { return 'GetModelImage' }
    getMethod() { return 'GET' }
    createResponse() { return new Blob() }
}
export class QueryCompletedChatTasks extends QueryDb {
    /** @param {{db?:string,id?:number,refId?:string,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?string} */
    db;
    /** @type {?number} */
    id;
    /** @type {?string} */
    refId;
    getTypeName() { return 'QueryCompletedChatTasks' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryFailedChatTasks extends QueryDb {
    /** @param {{db?:string,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?string} */
    db;
    getTypeName() { return 'QueryFailedChatTasks' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class CreateOpenAiChat {
    /** @param {{refId?:string,provider?:string,replyTo?:string,tag?:string,request?:OpenAiChat}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    refId;
    /** @type {?string} */
    provider;
    /** @type {?string} */
    replyTo;
    /** @type {?string} */
    tag;
    /** @type {OpenAiChat} */
    request;
    getTypeName() { return 'CreateOpenAiChat' }
    getMethod() { return 'POST' }
    createResponse() { return new CreateOpenAiChatResponse() }
}
export class WaitForOpenAiChat {
    /** @param {{id?:number,refId?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?number} */
    id;
    /** @type {?string} */
    refId;
    getTypeName() { return 'WaitForOpenAiChat' }
    getMethod() { return 'GET' }
    createResponse() { return new GetOpenAiChatResponse() }
}
export class GetOpenAiChat {
    /** @param {{id?:number,refId?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?number} */
    id;
    /** @type {?string} */
    refId;
    getTypeName() { return 'GetOpenAiChat' }
    getMethod() { return 'GET' }
    createResponse() { return new GetOpenAiChatResponse() }
}
export class GetActiveProviders {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'GetActiveProviders' }
    getMethod() { return 'GET' }
    createResponse() { return new GetActiveProvidersResponse() }
}
export class ChatApiProvider {
    /** @param {{provider?:string,model?:string,request?:OpenAiChat,prompt?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    provider;
    /** @type {string} */
    model;
    /** @type {?OpenAiChat} */
    request;
    /** @type {?string} */
    prompt;
    getTypeName() { return 'ChatApiProvider' }
    getMethod() { return 'POST' }
    createResponse() { return new OpenAiChatResponse() }
}
export class CreateApiKey {
    /** @param {{key?:string,name?:string,userId?:string,userName?:string,scopes?:string[],notes?:string,refId?:number,refIdStr?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    key;
    /** @type {string} */
    name;
    /** @type {?string} */
    userId;
    /** @type {?string} */
    userName;
    /** @type {string[]} */
    scopes;
    /** @type {?string} */
    notes;
    /** @type {?number} */
    refId;
    /** @type {?string} */
    refIdStr;
    /** @type {?{ [index: string]: string; }} */
    meta;
    getTypeName() { return 'CreateApiKey' }
    getMethod() { return 'POST' }
    createResponse() { return new CreateApiKeyResponse() }
}
export class AdminAddModel {
    /** @param {{model?:ApiModel,apiTypes?:{ [index: string]: Property; },apiProviders?:{ [index: string]: ApiProviderModel; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {ApiModel} */
    model;
    /** @type {?{ [index: string]: Property; }} */
    apiTypes;
    /** @type {?{ [index: string]: ApiProviderModel; }} */
    apiProviders;
    getTypeName() { return 'AdminAddModel' }
    getMethod() { return 'POST' }
    createResponse() { return new EmptyResponse() }
}
export class StopWorkers {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'StopWorkers' }
    getMethod() { return 'POST' }
    createResponse() { return new EmptyResponse() }
}
export class StartWorkers {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'StartWorkers' }
    getMethod() { return 'POST' }
    createResponse() { return new EmptyResponse() }
}
export class RestartWorkers {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'RestartWorkers' }
    getMethod() { return 'POST' }
    createResponse() { return new EmptyResponse() }
}
export class ChangeApiProviderStatus {
    /** @param {{provider?:string,online?:boolean}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    provider;
    /** @type {boolean} */
    online;
    getTypeName() { return 'ChangeApiProviderStatus' }
    getMethod() { return 'POST' }
    createResponse() { return new StringResponse() }
}
export class FirePeriodicTask {
    /** @param {{frequency?:PeriodicFrequency}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {PeriodicFrequency} */
    frequency;
    getTypeName() { return 'FirePeriodicTask' }
    getMethod() { return 'POST' }
    createResponse() { return new EmptyResponse() }
}
export class GetSummaryStats {
    /** @param {{from?:string,to?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    from;
    /** @type {?string} */
    to;
    getTypeName() { return 'GetSummaryStats' }
    getMethod() { return 'GET' }
    createResponse() { return new GetSummaryStatsResponse() }
}
export class StopComfyWorkers {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'StopComfyWorkers' }
    getMethod() { return 'POST' }
    createResponse () { };
}
export class StartComfyWorkers {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'StartComfyWorkers' }
    getMethod() { return 'POST' }
    createResponse () { };
}
export class RestartComfyWorkers {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'RestartComfyWorkers' }
    getMethod() { return 'POST' }
    createResponse () { };
}
export class ResetActiveComfyProviders {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'ResetActiveComfyProviders' }
    getMethod() { return 'POST' }
    createResponse () { };
}
export class ChangeComfyApiProviderStatus {
    /** @param {{provider?:string,online?:boolean}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    provider;
    /** @type {boolean} */
    online;
    getTypeName() { return 'ChangeComfyApiProviderStatus' }
    getMethod() { return 'POST' }
    createResponse() { return new StringResponse() }
}
export class UpdateComfyApiProvider {
    /** @param {{id?:number,name?:string,apiKey?:string,apiKeyHeader?:string,apiBaseUrl?:string,heartbeatUrl?:string,taskPaths?:{ [index: string]: string; },concurrency?:number,priority?:number,enabled?:boolean}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    name;
    /** @type {?string} */
    apiKey;
    /** @type {?string} */
    apiKeyHeader;
    /** @type {?string} */
    apiBaseUrl;
    /** @type {?string} */
    heartbeatUrl;
    /** @type {?{ [index: string]: string; }} */
    taskPaths;
    /** @type {?number} */
    concurrency;
    /** @type {?number} */
    priority;
    /** @type {?boolean} */
    enabled;
    getTypeName() { return 'UpdateComfyApiProvider' }
    getMethod() { return 'PUT' }
    createResponse() { return new IdResponse() }
}
export class AddComfyProviderModel {
    /** @param {{comfyApiProviderId?:number,comfyApiModelId?:number,comfyApiModelName?:string,comfyApiProviderName?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    comfyApiProviderId;
    /** @type {number} */
    comfyApiModelId;
    /** @type {?string} */
    comfyApiModelName;
    /** @type {?string} */
    comfyApiProviderName;
    getTypeName() { return 'AddComfyProviderModel' }
    getMethod() { return 'POST' }
    createResponse() { return new IdResponse() }
}
export class FireComfyPeriodicTask {
    /** @param {{frequency?:PeriodicFrequency}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {PeriodicFrequency} */
    frequency;
    getTypeName() { return 'FireComfyPeriodicTask' }
    getMethod() { return 'POST' }
    createResponse () { };
}
export class Authenticate {
    /** @param {{provider?:string,userName?:string,password?:string,rememberMe?:boolean,accessToken?:string,accessTokenSecret?:string,returnUrl?:string,errorView?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description AuthProvider, e.g. credentials */
    provider;
    /** @type {string} */
    userName;
    /** @type {string} */
    password;
    /** @type {?boolean} */
    rememberMe;
    /** @type {string} */
    accessToken;
    /** @type {string} */
    accessTokenSecret;
    /** @type {string} */
    returnUrl;
    /** @type {string} */
    errorView;
    /** @type {{ [index: string]: string; }} */
    meta;
    getTypeName() { return 'Authenticate' }
    getMethod() { return 'POST' }
    createResponse() { return new AuthenticateResponse() }
}
export class QueryApiProviders extends QueryDb {
    /** @param {{name?:string,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?string} */
    name;
    getTypeName() { return 'QueryApiProviders' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryApiProviderModels extends QueryDb {
    /** @param {{apiProviderId?:number,model?:string,apiModel?:string,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?number} */
    apiProviderId;
    /** @type {?string} */
    model;
    /** @type {?string} */
    apiModel;
    getTypeName() { return 'QueryApiProviderModels' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryApiModels extends QueryDb {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    getTypeName() { return 'QueryApiModels' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryApiType extends QueryDb {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    getTypeName() { return 'QueryApiType' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryComfyGenerationTasks extends QueryDb {
    /** @param {{refId?:string,provider?:string,status?:ComfyWorkflowStatus,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?string} */
    refId;
    /** @type {?string} */
    provider;
    /** @type {?ComfyWorkflowStatus} */
    status;
    getTypeName() { return 'QueryComfyGenerationTasks' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryComfySummary extends QueryDb {
    /** @param {{refId?:string,provider?:string,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?string} */
    refId;
    /** @type {?string} */
    provider;
    getTypeName() { return 'QueryComfySummary' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryComfyApiProviders extends QueryDb {
    /** @param {{name?:string,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?string} */
    name;
    getTypeName() { return 'QueryComfyApiProviders' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryComfyApiProviderModels extends QueryDb {
    /** @param {{comfyApiProviderId?:number,comfyApiModelId?:number,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?number} */
    comfyApiProviderId;
    /** @type {?number} */
    comfyApiModelId;
    getTypeName() { return 'QueryComfyApiProviderModels' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryComfyApiModels extends QueryDb {
    /** @param {{name?:string,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?string} */
    name;
    getTypeName() { return 'QueryComfyApiModels' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryComfyApiModelSettings extends QueryDb {
    /** @param {{comfyApiModelId?:number,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?number} */
    comfyApiModelId;
    getTypeName() { return 'QueryComfyApiModelSettings' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryBackgroundJobs extends QueryDb {
    /** @param {{id?:number,refId?:string,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?number} */
    id;
    /** @type {?string} */
    refId;
    getTypeName() { return 'QueryBackgroundJobs' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryTaskSummary extends QueryDb {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    getTypeName() { return 'QueryTaskSummary' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class CreateApiProvider {
    /** @param {{name?:string,apiTypeId?:number,apiKey?:string,apiKeyHeader?:string,apiBaseUrl?:string,heartbeatUrl?:string,taskPaths?:{ [index: string]: string; },concurrency?:number,priority?:number,enabled?:boolean,models?:ApiProviderModel[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The unique name for this API Provider */
    name;
    /**
     * @type {number}
     * @description The behavior for this API Provider */
    apiTypeId;
    /**
     * @type {?string}
     * @description The API Key to use for this Provider */
    apiKey;
    /**
     * @type {?string}
     * @description Send the API Key in the Header instead of Authorization Bearer */
    apiKeyHeader;
    /**
     * @type {?string}
     * @description The Base URL for the API Provider */
    apiBaseUrl;
    /**
     * @type {?string}
     * @description The URL to check if the API Provider is still online */
    heartbeatUrl;
    /**
     * @type {?{ [index: string]: string; }}
     * @description Override API Paths for different AI Tasks */
    taskPaths;
    /**
     * @type {number}
     * @description How many requests should be made concurrently */
    concurrency;
    /**
     * @type {number}
     * @description What priority to give this Provider to use for processing models */
    priority;
    /**
     * @type {boolean}
     * @description Whether the Provider is enabled */
    enabled;
    /**
     * @type {ApiProviderModel[]}
     * @description The models this API Provider can process */
    models;
    getTypeName() { return 'CreateApiProvider' }
    getMethod() { return 'POST' }
    createResponse() { return new IdResponse() }
}
export class CreateApiProviderModel {
    /** @param {{apiProviderId?:number,model?:string,apiModel?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {number}
     * @description The ApiProvider Id */
    apiProviderId;
    /**
     * @type {string}
     * @description Supported ApiModel Name */
    model;
    /**
     * @type {?string}
     * @description Model to use when sending requests to the API Provider */
    apiModel;
    getTypeName() { return 'CreateApiProviderModel' }
    getMethod() { return 'POST' }
    createResponse() { return new IdResponse() }
}
export class UpdateApiProviderModel {
    /** @param {{id?:number,apiProviderId?:number,model?:string,apiModel?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {number}
     * @description The ApiProviderModel Id */
    id;
    /**
     * @type {?number}
     * @description The ApiProvider Id */
    apiProviderId;
    /**
     * @type {?string}
     * @description Supported ApiModel Name */
    model;
    /**
     * @type {?string}
     * @description Model to use when sending requests to the API Provider */
    apiModel;
    getTypeName() { return 'UpdateApiProviderModel' }
    getMethod() { return 'PATCH' }
    createResponse() { return new IdResponse() }
}
export class DeleteApiProviderModel {
    /** @param {{id?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {number}
     * @description The ApiProviderModel Id */
    id;
    getTypeName() { return 'DeleteApiProviderModel' }
    getMethod() { return 'DELETE' }
    createResponse() { return new IdResponse() }
}
export class CreateApiModel {
    /** @param {{name?:string,parameters?:string,website?:string,contextSize?:number,developer?:string,notes?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    name;
    /** @type {?string} */
    parameters;
    /** @type {?string} */
    website;
    /** @type {?number} */
    contextSize;
    /** @type {?string} */
    developer;
    /** @type {?string} */
    notes;
    getTypeName() { return 'CreateApiModel' }
    getMethod() { return 'POST' }
    createResponse() { return new IdResponse() }
}
export class CreateComfyApiProvider {
    /** @param {{name?:string,apiKey?:string,apiKeyHeader?:string,apiBaseUrl?:string,heartbeatUrl?:string,taskWorkflows?:{ [index: string]: string; },concurrency?:number,priority?:number,enabled?:boolean,models?:ComfyApiProviderModel[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    name;
    /** @type {?string} */
    apiKey;
    /** @type {?string} */
    apiKeyHeader;
    /** @type {?string} */
    apiBaseUrl;
    /** @type {?string} */
    heartbeatUrl;
    /** @type {?{ [index: string]: string; }} */
    taskWorkflows;
    /** @type {number} */
    concurrency;
    /** @type {number} */
    priority;
    /** @type {boolean} */
    enabled;
    /** @type {ComfyApiProviderModel[]} */
    models;
    getTypeName() { return 'CreateComfyApiProvider' }
    getMethod() { return 'POST' }
    createResponse() { return new IdResponse() }
}
export class DeleteComfyApiProvider {
    /** @param {{id?:number,name?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?number} */
    id;
    /** @type {?string} */
    name;
    getTypeName() { return 'DeleteComfyApiProvider' }
    getMethod() { return 'DELETE' }
    createResponse() { return new IdResponse() }
}
export class DeleteComfyApiModel {
    /** @param {{id?:number,name?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?number} */
    id;
    /** @type {?string} */
    name;
    getTypeName() { return 'DeleteComfyApiModel' }
    getMethod() { return 'DELETE' }
    createResponse() { return new IdResponse() }
}
export class CreateComfyApiModel {
    /** @param {{name?:string,description?:string,tags?:string,filename?:string,downloadUrl?:string,iconUrl?:string,url?:string,modelSettings?:ComfyApiModelSettings}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    name;
    /** @type {?string} */
    description;
    /** @type {?string} */
    tags;
    /** @type {string} */
    filename;
    /** @type {string} */
    downloadUrl;
    /** @type {string} */
    iconUrl;
    /** @type {string} */
    url;
    /** @type {?ComfyApiModelSettings} */
    modelSettings;
    getTypeName() { return 'CreateComfyApiModel' }
    getMethod() { return 'POST' }
    createResponse() { return new IdResponse() }
}
export class CreateComfyApiProviderModel {
    /** @param {{comfyApiProviderId?:number,comfyApiModelId?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    comfyApiProviderId;
    /** @type {number} */
    comfyApiModelId;
    getTypeName() { return 'CreateComfyApiProviderModel' }
    getMethod() { return 'POST' }
    createResponse() { return new IdResponse() }
}
export class CreateComfyApiModelSettings {
    /** @param {{comfyApiModelId?:number,cfgScale?:number,scheduler?:string,sampler?:ComfySampler,width?:number,height?:number,steps?:number,negativePrompt?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    comfyApiModelId;
    /** @type {?number} */
    cfgScale;
    /** @type {?string} */
    scheduler;
    /** @type {?ComfySampler} */
    sampler;
    /** @type {?number} */
    width;
    /** @type {?number} */
    height;
    /** @type {?number} */
    steps;
    /** @type {?string} */
    negativePrompt;
    getTypeName() { return 'CreateComfyApiModelSettings' }
    getMethod() { return 'POST' }
    createResponse() { return new IdResponse() }
}
export class DeleteComfyApiModelSettings {
    /** @param {{id?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    getTypeName() { return 'DeleteComfyApiModelSettings' }
    getMethod() { return 'DELETE' }
    createResponse() { return new EmptyResponse() }
}
export class UpdateComfyApiModelSettings {
    /** @param {{id?:number,cfgScale?:number,scheduler?:string,sampler?:ComfySampler,width?:number,height?:number,steps?:number,negativePrompt?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {?number} */
    cfgScale;
    /** @type {?string} */
    scheduler;
    /** @type {?ComfySampler} */
    sampler;
    /** @type {?number} */
    width;
    /** @type {?number} */
    height;
    /** @type {?number} */
    steps;
    /** @type {?string} */
    negativePrompt;
    getTypeName() { return 'UpdateComfyApiModelSettings' }
    getMethod() { return 'PUT' }
    createResponse() { return new EmptyResponse() }
}
export class UpdateComfyApiProviderModel {
    /** @param {{id?:number,comfyApiModelId?:number,comfyApiProviderId?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {number} */
    comfyApiModelId;
    /** @type {number} */
    comfyApiProviderId;
    getTypeName() { return 'UpdateComfyApiProviderModel' }
    getMethod() { return 'PUT' }
    createResponse() { return new EmptyResponse() }
}
export class DeleteComfyApiProviderModel {
    /** @param {{id?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    getTypeName() { return 'DeleteComfyApiProviderModel' }
    getMethod() { return 'DELETE' }
    createResponse() { return new EmptyResponse() }
}
export class UpdateApiProvider {
    /** @param {{id?:number,apiKey?:string,apiBaseUrl?:string,heartbeatUrl?:string,concurrency?:number,priority?:number,enabled?:boolean}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {?string} */
    apiKey;
    /** @type {?string} */
    apiBaseUrl;
    /** @type {?string} */
    heartbeatUrl;
    /** @type {?number} */
    concurrency;
    /** @type {?number} */
    priority;
    /** @type {?boolean} */
    enabled;
    getTypeName() { return 'UpdateApiProvider' }
    getMethod() { return 'PATCH' }
    createResponse() { return new IdResponse() }
}

