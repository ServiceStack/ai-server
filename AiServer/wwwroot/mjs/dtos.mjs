/* Options:
Date: 2024-07-23 21:02:38
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
/** @typedef {'euler'|'euler_ancestral'|'huen'|'huenpp2'|'dpm_2'|'dpm_2_ancestral'|'lms'|'dpm_fast'|'dpm_adaptive'|'dpmpp_2s_ancestral'|'dpmpp_sde'|'dpmpp_sde_gpu'|'dpmpp_2m'|'dpmpp_2m_sde'|'dpmpp_2m_sde_gpu'|'dpmpp_3m_sde'|'dpmpp_3m_sde_gpu'|'ddpm'|'lcm'|'ddim'|'uni_pc'|'uni_pc_bh2'} */
export var ComfySampler;
(function (ComfySampler) {
    ComfySampler["euler"] = "euler"
    ComfySampler["euler_ancestral"] = "euler_ancestral"
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
/** @typedef {'ThreeDModel'|'AnalogFilm'|'Anime'|'Cinematic'|'ComicBook'|'DigitalArt'|'Enhance'|'FantasyArt'|'Isometric'|'LineArt'|'LowPoly'|'ModelingCompound'|'NeonPunk'|'Origami'|'Photographic'|'PixelArt'|'TileTexture'} */
export var ArtStyle;
(function (ArtStyle) {
    ArtStyle["ThreeDModel"] = "ThreeDModel"
    ArtStyle["AnalogFilm"] = "AnalogFilm"
    ArtStyle["Anime"] = "Anime"
    ArtStyle["Cinematic"] = "Cinematic"
    ArtStyle["ComicBook"] = "ComicBook"
    ArtStyle["DigitalArt"] = "DigitalArt"
    ArtStyle["Enhance"] = "Enhance"
    ArtStyle["FantasyArt"] = "FantasyArt"
    ArtStyle["Isometric"] = "Isometric"
    ArtStyle["LineArt"] = "LineArt"
    ArtStyle["LowPoly"] = "LowPoly"
    ArtStyle["ModelingCompound"] = "ModelingCompound"
    ArtStyle["NeonPunk"] = "NeonPunk"
    ArtStyle["Origami"] = "Origami"
    ArtStyle["Photographic"] = "Photographic"
    ArtStyle["PixelArt"] = "PixelArt"
    ArtStyle["TileTexture"] = "TileTexture"
})(ArtStyle || (ArtStyle = {}));
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
export class OpenAiChatTask extends TaskBase {
    /** @param {{request?:OpenAiChat,response?:OpenAiChatResponse,id?:number,model?:string,provider?:string,refId?:string,tag?:string,replyTo?:string,createdDate?:string,createdBy?:string,worker?:string,workerIp?:string,requestId?:string,startedDate?:string,completedDate?:string,durationMs?:number,retryLimit?:number,retries?:number,notificationDate?:string,errorCode?:string,error?:ResponseStatus}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {OpenAiChat} */
    request;
    /** @type {?OpenAiChatResponse} */
    response;
}
export class OpenAiChatCompleted extends OpenAiChatTask {
    /** @param {{request?:OpenAiChat,response?:OpenAiChatResponse,id?:number,model?:string,provider?:string,refId?:string,tag?:string,replyTo?:string,createdDate?:string,createdBy?:string,worker?:string,workerIp?:string,requestId?:string,startedDate?:string,completedDate?:string,durationMs?:number,retryLimit?:number,retries?:number,notificationDate?:string,errorCode?:string,error?:ResponseStatus}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
}
export class OpenAiChatFailed extends OpenAiChatTask {
    /** @param {{failedDate?:string,request?:OpenAiChat,response?:OpenAiChatResponse,id?:number,model?:string,provider?:string,refId?:string,tag?:string,replyTo?:string,createdDate?:string,createdBy?:string,worker?:string,workerIp?:string,requestId?:string,startedDate?:string,completedDate?:string,durationMs?:number,retryLimit?:number,retries?:number,notificationDate?:string,errorCode?:string,error?:ResponseStatus}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {string} */
    failedDate;
}
/** @typedef {number} */
export var TaskType;
(function (TaskType) {
    TaskType[TaskType["OpenAiChat"] = 1] = "OpenAiChat"
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
/** @typedef {'Minute'|'Hourly'|'Daily'|'Monthly'} */
export var PeriodicFrequency;
(function (PeriodicFrequency) {
    PeriodicFrequency["Minute"] = "Minute"
    PeriodicFrequency["Hourly"] = "Hourly"
    PeriodicFrequency["Daily"] = "Daily"
    PeriodicFrequency["Monthly"] = "Monthly"
})(PeriodicFrequency || (PeriodicFrequency = {}));
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
export class ComfyWorkflowRequest {
    /** @param {{id?:number,model?:string,steps?:number,batchSize?:number,seed?:number,positivePrompt?:string,negativePrompt?:string,image?:ComfyFileInput,speech?:ComfyFileInput,mask?:ComfyFileInput,imageInput?:string,speechInput?:string,maskInput?:string,sampler?:ComfySampler,artStyle?:ArtStyle,scheduler?:string,cfgScale?:number,denoise?:number,upscaleModel?:string,width?:number,height?:number,taskType?:ComfyTaskType,refId?:string,provider?:string,replyTo?:string,tag?:string,clip?:string,sampleLength?:number,maskChannel?:ComfyMaskSource}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
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
    /** @type {?ArtStyle} */
    artStyle;
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
    refId;
    /** @type {?string} */
    provider;
    /** @type {?string} */
    replyTo;
    /** @type {?string} */
    tag;
    /** @type {?string} */
    clip;
    /** @type {?number} */
    sampleLength;
    /** @type {ComfyMaskSource} */
    maskChannel;
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
    /** @param {{statusMessage?:string,completed?:boolean,outputs?:ComfyOutput[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    statusMessage;
    /** @type {boolean} */
    completed;
    /** @type {ComfyOutput[]} */
    outputs;
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
export class ComfyHostedFileOutput {
    /** @param {{url?:string,fileName?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    url;
    /** @type {string} */
    fileName;
}
export class PageStats {
    /** @param {{label?:string,total?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    label;
    /** @type {number} */
    total;
}
export class OpenAiChatRequest {
    /** @param {{id?:number,model?:string,provider?:string,request?:OpenAiChat}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    model;
    /** @type {string} */
    provider;
    /** @type {OpenAiChat} */
    request;
}
export class WorkerStats {
    /** @param {{name?:string,queued?:number,received?:number,completed?:number,retries?:number,failed?:number,offline?:string,running?:boolean}} [init] */
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
    /** @type {?string} */
    offline;
    /** @type {boolean} */
    running;
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
export class ComfyAgentDownloadStatus {
    /** @param {{name?:string,progress?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    name;
    /** @type {?number} */
    progress;
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
export class GetOpenAiChatResponse {
    /** @param {{result?:OpenAiChatTask,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?OpenAiChatTask} */
    result;
    /** @type {?ResponseStatus} */
    responseStatus;
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
export class FetchOpenAiChatRequestsResponse {
    /** @param {{results?:OpenAiChatRequest[],responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {OpenAiChatRequest[]} */
    results;
    /** @type {?ResponseStatus} */
    responseStatus;
}
export class EmptyResponse {
    /** @param {{responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {ResponseStatus} */
    responseStatus;
}
export class ChatNotifyCompletedTasksResponse {
    /** @param {{errors?:{ [index: number]: string; },results?:number[],responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {{ [index: number]: string; }} */
    errors;
    /** @type {number[]} */
    results;
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
export class GetApiWorkerStatsResponse {
    /** @param {{results?:WorkerStats[],responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {WorkerStats[]} */
    results;
    /** @type {?ResponseStatus} */
    responseStatus;
}
export class RerunCompletedTasksResponse {
    /** @param {{errors?:{ [index: number]: string; },results?:number[],responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {{ [index: number]: string; }} */
    errors;
    /** @type {number[]} */
    results;
    /** @type {?ResponseStatus} */
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
export class IdResponse {
    /** @param {{id?:string,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    id;
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
    /** @param {{model?:string,steps?:number,batchSize?:number,seed?:number,positivePrompt?:string,negativePrompt?:string,imageInput?:string,speechInput?:string,maskInput?:string,sampler?:ComfySampler,artStyle?:ArtStyle,scheduler?:string,cfgScale?:number,denoise?:number,upscaleModel?:string,width?:number,height?:number,clip?:string,sampleLength?:number,taskType?:ComfyTaskType,refId?:string,provider?:string,replyTo?:string,tag?:string}} [init] */
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
    /** @type {?ArtStyle} */
    artStyle;
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
export class DownloadConfgiuredArtStyleModel {
    /** @param {{artStyle?:ArtStyle}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?ArtStyle} */
    artStyle;
    getTypeName() { return 'DownloadConfgiuredArtStyleModel' }
    getMethod() { return 'POST' }
    createResponse() { return new ComfyAgentDownloadStatus() }
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
export class FetchOpenAiChatRequests {
    /** @param {{models?:string[],provider?:string,worker?:string,take?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string[]} */
    models;
    /** @type {string} */
    provider;
    /** @type {?string} */
    worker;
    /** @type {?number} */
    take;
    getTypeName() { return 'FetchOpenAiChatRequests' }
    getMethod() { return 'POST' }
    createResponse() { return new FetchOpenAiChatRequestsResponse() }
}
export class ChatOperations {
    /** @param {{resetTaskQueue?:boolean,requeueIncompleteTasks?:boolean}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?boolean} */
    resetTaskQueue;
    /** @type {?boolean} */
    requeueIncompleteTasks;
    getTypeName() { return 'ChatOperations' }
    getMethod() { return 'POST' }
    createResponse() { return new EmptyResponse() }
}
export class ChatFailedTasks {
    /** @param {{resetErrorState?:boolean,requeueFailedTaskIds?:number[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?boolean} */
    resetErrorState;
    /** @type {?number[]} */
    requeueFailedTaskIds;
    getTypeName() { return 'ChatFailedTasks' }
    getMethod() { return 'POST' }
    createResponse() { return new EmptyResponse() }
}
export class ChatNotifyCompletedTasks {
    /** @param {{ids?:number[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number[]} */
    ids;
    getTypeName() { return 'ChatNotifyCompletedTasks' }
    getMethod() { return 'POST' }
    createResponse() { return new ChatNotifyCompletedTasksResponse() }
}
export class CompleteOpenAiChat {
    /** @param {{id?:number,provider?:string,durationMs?:number,response?:OpenAiChatResponse}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    provider;
    /** @type {number} */
    durationMs;
    /** @type {OpenAiChatResponse} */
    response;
    getTypeName() { return 'CompleteOpenAiChat' }
    getMethod() { return 'POST' }
    createResponse() { return new EmptyResponse() }
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
export class GetApiWorkerStats {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'GetApiWorkerStats' }
    getMethod() { return 'GET' }
    createResponse() { return new GetApiWorkerStatsResponse() }
}
export class RerunCompletedTasks {
    /** @param {{ids?:number[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number[]} */
    ids;
    getTypeName() { return 'RerunCompletedTasks' }
    getMethod() { return 'POST' }
    createResponse() { return new RerunCompletedTasksResponse() }
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
export class ResetActiveProviders {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'ResetActiveProviders' }
    getMethod() { return 'GET' }
    createResponse() { return new GetActiveProvidersResponse() }
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
export class QueryOpenAiChat extends QueryDb {
    /** @param {{id?:number,refId?:string,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?number} */
    id;
    /** @type {?string} */
    refId;
    getTypeName() { return 'QueryOpenAiChat' }
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

