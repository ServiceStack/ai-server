/* Options:
Date: 2024-10-07 02:10:35
Version: 8.41
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
/** @typedef {'mp3'|'wav'|'flac'|'ogg'} */
export var AudioFormat;
(function (AudioFormat) {
    AudioFormat["MP3"] = "mp3"
    AudioFormat["WAV"] = "wav"
    AudioFormat["FLAC"] = "flac"
    AudioFormat["OGG"] = "ogg"
})(AudioFormat || (AudioFormat = {}));
/** @typedef {'jpg'|'png'|'gif'|'bmp'|'tiff'|'webp'} */
export var ImageOutputFormat;
(function (ImageOutputFormat) {
    ImageOutputFormat["Jpg"] = "jpg"
    ImageOutputFormat["Png"] = "png"
    ImageOutputFormat["Gif"] = "gif"
    ImageOutputFormat["Bmp"] = "bmp"
    ImageOutputFormat["Tiff"] = "tiff"
    ImageOutputFormat["Webp"] = "webp"
})(ImageOutputFormat || (ImageOutputFormat = {}));
/** @typedef {'TopLeft'|'TopRight'|'BottomLeft'|'BottomRight'|'Center'} */
export var WatermarkPosition;
(function (WatermarkPosition) {
    WatermarkPosition["TopLeft"] = "TopLeft"
    WatermarkPosition["TopRight"] = "TopRight"
    WatermarkPosition["BottomLeft"] = "BottomLeft"
    WatermarkPosition["BottomRight"] = "BottomRight"
    WatermarkPosition["Center"] = "Center"
})(WatermarkPosition || (WatermarkPosition = {}));
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
/** @typedef {'Replicate'|'Comfy'|'OpenAi'} */
export var AiServiceProvider;
(function (AiServiceProvider) {
    AiServiceProvider["Replicate"] = "Replicate"
    AiServiceProvider["Comfy"] = "Comfy"
    AiServiceProvider["OpenAi"] = "OpenAi"
})(AiServiceProvider || (AiServiceProvider = {}));
export class MediaType {
    /** @param {{id?:string,apiBaseUrl?:string,apiKeyHeader?:string,website?:string,icon?:string,apiModels?:{ [index: string]: string; },provider?:AiServiceProvider}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    id;
    /** @type {?string} */
    apiBaseUrl;
    /** @type {?string} */
    apiKeyHeader;
    /** @type {string} */
    website;
    /** @type {?string} */
    icon;
    /** @type {{ [index: string]: string; }} */
    apiModels;
    /** @type {AiServiceProvider} */
    provider;
}
export class MediaProvider {
    /** @param {{id?:number,name?:string,apiKeyVar?:string,apiUrlVar?:string,apiKey?:string,apiKeyHeader?:string,apiBaseUrl?:string,heartbeatUrl?:string,concurrency?:number,priority?:number,enabled?:boolean,offlineDate?:string,createdDate?:string,mediaTypeId?:string,mediaType?:MediaType,models?:string[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    name;
    /** @type {?string} */
    apiKeyVar;
    /** @type {?string} */
    apiUrlVar;
    /** @type {?string} */
    apiKey;
    /** @type {?string} */
    apiKeyHeader;
    /** @type {?string} */
    apiBaseUrl;
    /** @type {?string} */
    heartbeatUrl;
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
    /** @type {string} */
    mediaTypeId;
    /** @type {?MediaType} */
    mediaType;
    /** @type {string[]} */
    models;
}
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
export var AiTaskType;
(function (AiTaskType) {
    AiTaskType[AiTaskType["TextToImage"] = 1] = "TextToImage"
    AiTaskType[AiTaskType["ImageToImage"] = 2] = "ImageToImage"
    AiTaskType[AiTaskType["ImageUpscale"] = 3] = "ImageUpscale"
    AiTaskType[AiTaskType["ImageWithMask"] = 4] = "ImageWithMask"
    AiTaskType[AiTaskType["ImageToText"] = 5] = "ImageToText"
    AiTaskType[AiTaskType["TextToAudio"] = 6] = "TextToAudio"
    AiTaskType[AiTaskType["TextToSpeech"] = 7] = "TextToSpeech"
    AiTaskType[AiTaskType["SpeechToText"] = 8] = "SpeechToText"
})(AiTaskType || (AiTaskType = {}));
/** @typedef {'red'|'blue'|'green'|'alpha'} */
export var ComfyMaskSource;
(function (ComfyMaskSource) {
    ComfyMaskSource["red"] = "red"
    ComfyMaskSource["blue"] = "blue"
    ComfyMaskSource["green"] = "green"
    ComfyMaskSource["alpha"] = "alpha"
})(ComfyMaskSource || (ComfyMaskSource = {}));
export class GenerationArgs {
    /** @param {{model?:string,steps?:number,batchSize?:number,seed?:number,positivePrompt?:string,negativePrompt?:string,imageInput?:string,speechInput?:string,maskInput?:string,audioInput?:string,sampler?:ComfySampler,scheduler?:string,cfgScale?:number,denoise?:number,upscaleModel?:string,width?:number,height?:number,taskType?:AiTaskType,clip?:string,sampleLength?:number,maskChannel?:ComfyMaskSource,aspectRatio?:string,quality?:number,voice?:string,language?:string}} [init] */
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
    /** @type {?string} */
    audioInput;
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
    /** @type {?AiTaskType} */
    taskType;
    /** @type {?string} */
    clip;
    /** @type {?number} */
    sampleLength;
    /** @type {ComfyMaskSource} */
    maskChannel;
    /** @type {?string} */
    aspectRatio;
    /** @type {?number} */
    quality;
    /** @type {?string} */
    voice;
    /** @type {?string} */
    language;
}
/** @typedef {'TextToImage'|'TextEncoder'|'ImageUpscale'|'TextToSpeech'|'TextToAudio'|'SpeechToText'|'ImageToText'|'ImageToImage'|'ImageWithMask'|'VAE'} */
export var ModelType;
(function (ModelType) {
    ModelType["TextToImage"] = "TextToImage"
    ModelType["TextEncoder"] = "TextEncoder"
    ModelType["ImageUpscale"] = "ImageUpscale"
    ModelType["TextToSpeech"] = "TextToSpeech"
    ModelType["TextToAudio"] = "TextToAudio"
    ModelType["SpeechToText"] = "SpeechToText"
    ModelType["ImageToText"] = "ImageToText"
    ModelType["ImageToImage"] = "ImageToImage"
    ModelType["ImageWithMask"] = "ImageWithMask"
    ModelType["VAE"] = "VAE"
})(ModelType || (ModelType = {}));
export class MediaModel {
    /** @param {{id?:string,apiModels?:{ [index: string]: string; },url?:string,quality?:number,aspectRatio?:string,cfgScale?:number,scheduler?:string,sampler?:ComfySampler,width?:number,height?:number,steps?:number,negativePrompt?:string,modelType?:ModelType}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    id;
    /** @type {{ [index: string]: string; }} */
    apiModels;
    /** @type {?string} */
    url;
    /** @type {?number} */
    quality;
    /** @type {?string} */
    aspectRatio;
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
    /** @type {?ModelType} */
    modelType;
}
/** @typedef {'ImageScale'|'VideoScale'|'ImageConvert'|'AudioConvert'|'VideoConvert'|'ImageCrop'|'VideoCrop'|'VideoCut'|'AudioCut'|'WatermarkImage'|'WatermarkVideo'} */
export var MediaTransformTaskType;
(function (MediaTransformTaskType) {
    MediaTransformTaskType["ImageScale"] = "ImageScale"
    MediaTransformTaskType["VideoScale"] = "VideoScale"
    MediaTransformTaskType["ImageConvert"] = "ImageConvert"
    MediaTransformTaskType["AudioConvert"] = "AudioConvert"
    MediaTransformTaskType["VideoConvert"] = "VideoConvert"
    MediaTransformTaskType["ImageCrop"] = "ImageCrop"
    MediaTransformTaskType["VideoCrop"] = "VideoCrop"
    MediaTransformTaskType["VideoCut"] = "VideoCut"
    MediaTransformTaskType["AudioCut"] = "AudioCut"
    MediaTransformTaskType["WatermarkImage"] = "WatermarkImage"
    MediaTransformTaskType["WatermarkVideo"] = "WatermarkVideo"
})(MediaTransformTaskType || (MediaTransformTaskType = {}));
/** @typedef {'mp4'|'avi'|'mkv'|'mov'|'webm'|'gif'|'mp3'|'wav'|'flac'} */
export var MediaOutputFormat;
(function (MediaOutputFormat) {
    MediaOutputFormat["MP4"] = "mp4"
    MediaOutputFormat["AVI"] = "avi"
    MediaOutputFormat["MKV"] = "mkv"
    MediaOutputFormat["MOV"] = "mov"
    MediaOutputFormat["WebM"] = "webm"
    MediaOutputFormat["GIF"] = "gif"
    MediaOutputFormat["MP3"] = "mp3"
    MediaOutputFormat["WAV"] = "wav"
    MediaOutputFormat["FLAC"] = "flac"
})(MediaOutputFormat || (MediaOutputFormat = {}));
export class MediaTransformArgs {
    /** @param {{taskType?:MediaTransformTaskType,videoInput?:string,audioInput?:string,imageInput?:string,watermarkInput?:string,videoFileName?:string,audioFileName?:string,imageFileName?:string,watermarkFileName?:string,outputFormat?:MediaOutputFormat,imageOutputFormat?:ImageOutputFormat,scaleWidth?:number,scaleHeight?:number,cropX?:number,cropY?:number,cropWidth?:number,cropHeight?:number,cutStart?:number,cutEnd?:number,watermarkFile?:string,watermarkPosition?:string,watermarkScale?:string,audioCodec?:string,videoCodec?:string,audioBitrate?:string,audioSampleRate?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?MediaTransformTaskType} */
    taskType;
    /** @type {?string} */
    videoInput;
    /** @type {?string} */
    audioInput;
    /** @type {?string} */
    imageInput;
    /** @type {?string} */
    watermarkInput;
    /** @type {?string} */
    videoFileName;
    /** @type {?string} */
    audioFileName;
    /** @type {?string} */
    imageFileName;
    /** @type {?string} */
    watermarkFileName;
    /** @type {?MediaOutputFormat} */
    outputFormat;
    /** @type {?ImageOutputFormat} */
    imageOutputFormat;
    /** @type {?number} */
    scaleWidth;
    /** @type {?number} */
    scaleHeight;
    /** @type {?number} */
    cropX;
    /** @type {?number} */
    cropY;
    /** @type {?number} */
    cropWidth;
    /** @type {?number} */
    cropHeight;
    /** @type {?number} */
    cutStart;
    /** @type {?number} */
    cutEnd;
    /** @type {?string} */
    watermarkFile;
    /** @type {?string} */
    watermarkPosition;
    /** @type {?string} */
    watermarkScale;
    /** @type {?string} */
    audioCodec;
    /** @type {?string} */
    videoCodec;
    /** @type {?string} */
    audioBitrate;
    /** @type {?number} */
    audioSampleRate;
}
export class AiModel {
    /** @param {{id?:string,tags?:string[],latest?:string,website?:string,description?:string,icon?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    id;
    /** @type {string[]} */
    tags;
    /** @type {?string} */
    latest;
    /** @type {?string} */
    website;
    /** @type {?string} */
    description;
    /** @type {?string} */
    icon;
}
/** @typedef {'OpenAiProvider'|'GoogleAiProvider'} */
export var AiProviderType;
(function (AiProviderType) {
    AiProviderType["OpenAiProvider"] = "OpenAiProvider"
    AiProviderType["GoogleAiProvider"] = "GoogleAiProvider"
})(AiProviderType || (AiProviderType = {}));
export class AiType {
    /** @param {{id?:string,provider?:AiProviderType,website?:string,apiBaseUrl?:string,heartbeatUrl?:string,icon?:string,apiModels?:{ [index: string]: string; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    id;
    /** @type {AiProviderType} */
    provider;
    /** @type {string} */
    website;
    /** @type {string} */
    apiBaseUrl;
    /** @type {?string} */
    heartbeatUrl;
    /** @type {?string} */
    icon;
    /** @type {{ [index: string]: string; }} */
    apiModels;
}
export class AiProviderModel {
    /** @param {{model?:string,apiModel?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    model;
    /** @type {?string} */
    apiModel;
}
export class AiProvider {
    /** @param {{id?:number,name?:string,apiBaseUrl?:string,apiKeyVar?:string,apiKey?:string,apiKeyHeader?:string,heartbeatUrl?:string,concurrency?:number,priority?:number,enabled?:boolean,offlineDate?:string,createdDate?:string,models?:AiProviderModel[],aiTypeId?:string,aiType?:AiType,selectedModels?:string[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    name;
    /** @type {?string} */
    apiBaseUrl;
    /** @type {?string} */
    apiKeyVar;
    /** @type {?string} */
    apiKey;
    /** @type {?string} */
    apiKeyHeader;
    /** @type {?string} */
    heartbeatUrl;
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
    /** @type {AiProviderModel[]} */
    models;
    /** @type {string} */
    aiTypeId;
    /** @type {AiType} */
    aiType;
    /** @type {string[]} */
    selectedModels;
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
     * @type {?number}
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
/** @typedef {number} */
export var TaskType;
(function (TaskType) {
    TaskType[TaskType["OpenAiChat"] = 1] = "OpenAiChat"
    TaskType[TaskType["Comfy"] = 2] = "Comfy"
})(TaskType || (TaskType = {}));
/** @typedef T {any} */
export class QueryData extends QueryBase {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
}
export class Prompt {
    /** @param {{id?:string,name?:string,value?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    id;
    /** @type {string} */
    name;
    /** @type {string} */
    value;
}
/** @typedef {'mp4'|'avi'|'mkv'|'mov'|'webm'|'gif'} */
export var ConvertVideoOutputFormat;
(function (ConvertVideoOutputFormat) {
    ConvertVideoOutputFormat["MP4"] = "mp4"
    ConvertVideoOutputFormat["AVI"] = "avi"
    ConvertVideoOutputFormat["MKV"] = "mkv"
    ConvertVideoOutputFormat["MOV"] = "mov"
    ConvertVideoOutputFormat["WebM"] = "webm"
    ConvertVideoOutputFormat["GIF"] = "gif"
})(ConvertVideoOutputFormat || (ConvertVideoOutputFormat = {}));
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
export class BackgroundJobBase {
    /** @param {{id?:number,parentId?:number,refId?:string,worker?:string,tag?:string,batchId?:string,callback?:string,dependsOn?:number,runAfter?:string,createdDate?:string,createdBy?:string,requestId?:string,requestType?:string,command?:string,request?:string,requestBody?:string,userId?:string,response?:string,responseBody?:string,state?:BackgroundJobState,startedDate?:string,completedDate?:string,notifiedDate?:string,retryLimit?:number,attempts?:number,durationMs?:number,timeoutSecs?:number,progress?:number,status?:string,logs?:string,lastActivityDate?:string,replyTo?:string,errorCode?:string,error?:ResponseStatus,args?:{ [index: string]: string; },meta?:{ [index: string]: string; }}} [init] */
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
    batchId;
    /** @type {?string} */
    callback;
    /** @type {?number} */
    dependsOn;
    /** @type {?string} */
    runAfter;
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
    userId;
    /** @type {?string} */
    response;
    /** @type {?string} */
    responseBody;
    /** @type {BackgroundJobState} */
    state;
    /** @type {?string} */
    startedDate;
    /** @type {?string} */
    completedDate;
    /** @type {?string} */
    notifiedDate;
    /** @type {?number} */
    retryLimit;
    /** @type {number} */
    attempts;
    /** @type {number} */
    durationMs;
    /** @type {?number} */
    timeoutSecs;
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
}
export class BackgroundJob extends BackgroundJobBase {
    /** @param {{id?:number,id?:number,parentId?:number,refId?:string,worker?:string,tag?:string,batchId?:string,callback?:string,dependsOn?:number,runAfter?:string,createdDate?:string,createdBy?:string,requestId?:string,requestType?:string,command?:string,request?:string,requestBody?:string,userId?:string,response?:string,responseBody?:string,state?:BackgroundJobState,startedDate?:string,completedDate?:string,notifiedDate?:string,retryLimit?:number,attempts?:number,durationMs?:number,timeoutSecs?:number,progress?:number,status?:string,logs?:string,lastActivityDate?:string,replyTo?:string,errorCode?:string,error?:ResponseStatus,args?:{ [index: string]: string; },meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {number} */
    id;
}
export class JobSummary {
    /** @param {{id?:number,parentId?:number,refId?:string,worker?:string,tag?:string,batchId?:string,createdDate?:string,createdBy?:string,requestType?:string,command?:string,request?:string,response?:string,userId?:string,callback?:string,startedDate?:string,completedDate?:string,state?:BackgroundJobState,durationMs?:number,attempts?:number,errorCode?:string,errorMessage?:string}} [init] */
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
    batchId;
    /** @type {string} */
    createdDate;
    /** @type {?string} */
    createdBy;
    /** @type {string} */
    requestType;
    /** @type {?string} */
    command;
    /** @type {string} */
    request;
    /** @type {?string} */
    response;
    /** @type {?string} */
    userId;
    /** @type {?string} */
    callback;
    /** @type {?string} */
    startedDate;
    /** @type {?string} */
    completedDate;
    /** @type {BackgroundJobState} */
    state;
    /** @type {number} */
    durationMs;
    /** @type {number} */
    attempts;
    /** @type {?string} */
    errorCode;
    /** @type {?string} */
    errorMessage;
}
export class BackgroundJobOptions {
    /** @param {{refId?:string,parentId?:number,worker?:string,runAfter?:string,callback?:string,dependsOn?:number,userId?:string,retryLimit?:number,replyTo?:string,tag?:string,batchId?:string,createdBy?:string,timeoutSecs?:number,timeout?:string,args?:{ [index: string]: string; },runCommand?:boolean}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    refId;
    /** @type {?number} */
    parentId;
    /** @type {?string} */
    worker;
    /** @type {?string} */
    runAfter;
    /** @type {?string} */
    callback;
    /** @type {?number} */
    dependsOn;
    /** @type {?string} */
    userId;
    /** @type {?number} */
    retryLimit;
    /** @type {?string} */
    replyTo;
    /** @type {?string} */
    tag;
    /** @type {?string} */
    batchId;
    /** @type {?string} */
    createdBy;
    /** @type {?number} */
    timeoutSecs;
    /** @type {?string} */
    timeout;
    /** @type {?{ [index: string]: string; }} */
    args;
    /** @type {?boolean} */
    runCommand;
}
export class ScheduledTask {
    /** @param {{id?:number,name?:string,interval?:string,cronExpression?:string,requestType?:string,command?:string,request?:string,requestBody?:string,options?:BackgroundJobOptions,lastRun?:string,lastJobId?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    name;
    /** @type {?string} */
    interval;
    /** @type {?string} */
    cronExpression;
    /** @type {string} */
    requestType;
    /** @type {?string} */
    command;
    /** @type {string} */
    request;
    /** @type {string} */
    requestBody;
    /** @type {?BackgroundJobOptions} */
    options;
    /** @type {?string} */
    lastRun;
    /** @type {?number} */
    lastJobId;
}
export class CompletedJob extends BackgroundJobBase {
    /** @param {{id?:number,parentId?:number,refId?:string,worker?:string,tag?:string,batchId?:string,callback?:string,dependsOn?:number,runAfter?:string,createdDate?:string,createdBy?:string,requestId?:string,requestType?:string,command?:string,request?:string,requestBody?:string,userId?:string,response?:string,responseBody?:string,state?:BackgroundJobState,startedDate?:string,completedDate?:string,notifiedDate?:string,retryLimit?:number,attempts?:number,durationMs?:number,timeoutSecs?:number,progress?:number,status?:string,logs?:string,lastActivityDate?:string,replyTo?:string,errorCode?:string,error?:ResponseStatus,args?:{ [index: string]: string; },meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
}
export class FailedJob extends BackgroundJobBase {
    /** @param {{id?:number,parentId?:number,refId?:string,worker?:string,tag?:string,batchId?:string,callback?:string,dependsOn?:number,runAfter?:string,createdDate?:string,createdBy?:string,requestId?:string,requestType?:string,command?:string,request?:string,requestBody?:string,userId?:string,response?:string,responseBody?:string,state?:BackgroundJobState,startedDate?:string,completedDate?:string,notifiedDate?:string,retryLimit?:number,attempts?:number,durationMs?:number,timeoutSecs?:number,progress?:number,status?:string,logs?:string,lastActivityDate?:string,replyTo?:string,errorCode?:string,error?:ResponseStatus,args?:{ [index: string]: string; },meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
}
export class PageStats {
    /** @param {{label?:string,total?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    label;
    /** @type {number} */
    total;
}
export class ArtifactOutput {
    /** @param {{url?:string,fileName?:string,provider?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {?string}
     * @description URL to access the generated image */
    url;
    /**
     * @type {?string}
     * @description Filename of the generated image */
    fileName;
    /**
     * @type {?string}
     * @description Provider used for image generation */
    provider;
}
export class TextOutput {
    /** @param {{text?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {?string}
     * @description The generated text */
    text;
}
export class SummaryStats {
    /** @param {{name?:string,total?:number,totalPromptTokens?:number,totalCompletionTokens?:number,totalMinutes?:number,tokensPerSecond?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    name;
    /** @type {number} */
    total;
    /** @type {number} */
    totalPromptTokens;
    /** @type {number} */
    totalCompletionTokens;
    /** @type {number} */
    totalMinutes;
    /** @type {number} */
    tokensPerSecond;
}
export class AiProviderTextOutput {
    /** @param {{text?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    text;
}
export class AiProviderFileOutput {
    /** @param {{fileName?:string,url?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    fileName;
    /** @type {string} */
    url;
}
export class GenerationResult {
    /** @param {{textOutputs?:AiProviderTextOutput[],outputs?:AiProviderFileOutput[],error?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?AiProviderTextOutput[]} */
    textOutputs;
    /** @type {?AiProviderFileOutput[]} */
    outputs;
    /** @type {?string} */
    error;
}
export class OllamaModelDetails {
    /** @param {{parent_model?:string,format?:string,family?:string,families?:string[],parameter_size?:string,quantization_level?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    parent_model;
    /** @type {string} */
    format;
    /** @type {string} */
    family;
    /** @type {string[]} */
    families;
    /** @type {string} */
    parameter_size;
    /** @type {string} */
    quantization_level;
}
export class OllamaModel {
    /** @param {{name?:string,model?:string,modified_at?:string,size?:number,digest?:string,details?:OllamaModelDetails}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    name;
    /** @type {string} */
    model;
    /** @type {string} */
    modified_at;
    /** @type {number} */
    size;
    /** @type {string} */
    digest;
    /** @type {OllamaModelDetails} */
    details;
}
export class WorkerStats {
    /** @param {{name?:string,queued?:number,received?:number,completed?:number,retries?:number,failed?:number,runningJob?:number,runningTime?:string}} [init] */
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
    /** @type {?number} */
    runningJob;
    /** @type {?string} */
    runningTime;
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
export class PartialApiKey {
    /** @param {{id?:number,name?:string,userId?:string,userName?:string,visibleKey?:string,environment?:string,createdDate?:string,expiryDate?:string,cancelledDate?:string,lastUsedDate?:string,scopes?:string[],features?:string[],restrictTo?:string[],notes?:string,refId?:number,refIdStr?:string,meta?:{ [index: string]: string; },active?:boolean}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    name;
    /** @type {string} */
    userId;
    /** @type {string} */
    userName;
    /** @type {string} */
    visibleKey;
    /** @type {string} */
    environment;
    /** @type {string} */
    createdDate;
    /** @type {?string} */
    expiryDate;
    /** @type {?string} */
    cancelledDate;
    /** @type {?string} */
    lastUsedDate;
    /** @type {string[]} */
    scopes;
    /** @type {string[]} */
    features;
    /** @type {string[]} */
    restrictTo;
    /** @type {string} */
    notes;
    /** @type {?number} */
    refId;
    /** @type {string} */
    refIdStr;
    /** @type {{ [index: string]: string; }} */
    meta;
    /** @type {boolean} */
    active;
}
export class JobStatSummary {
    /** @param {{name?:string,total?:number,completed?:number,retries?:number,failed?:number,cancelled?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    name;
    /** @type {number} */
    total;
    /** @type {number} */
    completed;
    /** @type {number} */
    retries;
    /** @type {number} */
    failed;
    /** @type {number} */
    cancelled;
}
export class HourSummary {
    /** @param {{hour?:string,total?:number,completed?:number,failed?:number,cancelled?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    hour;
    /** @type {number} */
    total;
    /** @type {number} */
    completed;
    /** @type {number} */
    failed;
    /** @type {number} */
    cancelled;
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
export class AdminDataResponse {
    /** @param {{pageStats?:PageStats[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {PageStats[]} */
    pageStats;
}
export class MediaTransformResponse {
    /** @param {{outputs?:ArtifactOutput[],textOutputs?:TextOutput[],responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {?ArtifactOutput[]}
     * @description List of generated outputs */
    outputs;
    /**
     * @type {?TextOutput[]}
     * @description List of generated text outputs */
    textOutputs;
    /**
     * @type {?ResponseStatus}
     * @description Detailed response status information */
    responseStatus;
}
export class QueueMediaTransformResponse {
    /** @param {{jobId?:number,refId?:string,jobState?:BackgroundJobState,status?:string,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {number}
     * @description Unique identifier of the background job */
    jobId;
    /**
     * @type {string}
     * @description Client-provided identifier for the request */
    refId;
    /**
     * @type {BackgroundJobState}
     * @description Current state of the background job */
    jobState;
    /**
     * @type {?string}
     * @description Current status of the transformation request */
    status;
    /**
     * @type {?ResponseStatus}
     * @description Detailed response status information */
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
export class GetComfyModelsResponse {
    /** @param {{results?:string[],responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string[]} */
    results;
    /** @type {?ResponseStatus} */
    responseStatus;
}
export class GetComfyModelMappingsResponse {
    /** @param {{models?:{ [index: string]: string; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {{ [index: string]: string; }} */
    models;
}
export class GetJobStatusResponse {
    /** @param {{jobId?:number,refId?:string,jobState?:BackgroundJobState,status?:string,outputs?:ArtifactOutput[],textOutputs?:TextOutput[],responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {number}
     * @description Unique identifier of the background job */
    jobId;
    /**
     * @type {string}
     * @description Client-provided identifier for the request */
    refId;
    /**
     * @type {BackgroundJobState}
     * @description Current state of the background job */
    jobState;
    /**
     * @type {?string}
     * @description Current status of the generation request */
    status;
    /**
     * @type {?ArtifactOutput[]}
     * @description List of generated outputs */
    outputs;
    /**
     * @type {?TextOutput[]}
     * @description List of generated text outputs */
    textOutputs;
    /**
     * @type {?ResponseStatus}
     * @description Detailed response status information */
    responseStatus;
}
export class GenerationResponse {
    /** @param {{outputs?:ArtifactOutput[],textOutputs?:TextOutput[],responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {?ArtifactOutput[]}
     * @description List of generated outputs */
    outputs;
    /**
     * @type {?TextOutput[]}
     * @description List of generated text outputs */
    textOutputs;
    /**
     * @type {?ResponseStatus}
     * @description Detailed response status information */
    responseStatus;
}
export class QueueGenerationResponse {
    /** @param {{jobId?:number,refId?:string,jobState?:BackgroundJobState,status?:string,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {number}
     * @description Unique identifier of the background job */
    jobId;
    /**
     * @type {string}
     * @description Client-provided identifier for the request */
    refId;
    /**
     * @type {BackgroundJobState}
     * @description Current state of the background job */
    jobState;
    /**
     * @type {?string}
     * @description Current status of the generation request */
    status;
    /**
     * @type {?ResponseStatus}
     * @description Detailed response status information */
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
export class CreateGenerationResponse {
    /** @param {{id?:number,refId?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    refId;
}
export class GetGenerationResponse {
    /** @param {{request?:GenerationArgs,result?:GenerationResult,outputs?:AiProviderFileOutput[],textOutputs?:AiProviderTextOutput[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {GenerationArgs} */
    request;
    /** @type {GenerationResult} */
    result;
    /** @type {?AiProviderFileOutput[]} */
    outputs;
    /** @type {?AiProviderTextOutput[]} */
    textOutputs;
}
export class IdResponse {
    /** @param {{id?:string,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    id;
    /** @type {ResponseStatus} */
    responseStatus;
}
export class CreateTransformResponse {
    /** @param {{id?:number,refId?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    refId;
}
export class HelloResponse {
    /** @param {{result?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    result;
}
export class GetOllamaModelsResponse {
    /** @param {{results?:OllamaModel[],responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {OllamaModel[]} */
    results;
    /** @type {ResponseStatus} */
    responseStatus;
}
export class GetWorkerStatsResponse {
    /** @param {{results?:WorkerStats[],queueCounts?:{ [index: string]: number; },responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {WorkerStats[]} */
    results;
    /** @type {{ [index: string]: number; }} */
    queueCounts;
    /** @type {?ResponseStatus} */
    responseStatus;
}
export class EmptyResponse {
    /** @param {{responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {ResponseStatus} */
    responseStatus;
}
export class OpenAiChatResponse {
    /** @param {{id?:string,choices?:Choice[],created?:number,model?:string,system_fingerprint?:string,object?:string,usage?:OpenAiUsage,responseStatus?:ResponseStatus}} [init] */
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
    /** @type {?ResponseStatus} */
    responseStatus;
}
export class QueueOpenAiChatResponse {
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
    /** @param {{result?:BackgroundJobBase,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?BackgroundJobBase} */
    result;
    /** @type {?ResponseStatus} */
    responseStatus;
}
export class GetOpenAiChatStatusResponse {
    /** @param {{jobId?:number,refId?:string,jobState?:BackgroundJobState,status?:string,responseStatus?:ResponseStatus,chatResponse?:OpenAiChatResponse}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {number}
     * @description Unique identifier of the background job */
    jobId;
    /**
     * @type {string}
     * @description Client-provided identifier for the request */
    refId;
    /**
     * @type {BackgroundJobState}
     * @description Current state of the background job */
    jobState;
    /**
     * @type {?string}
     * @description Current status of the generation request */
    status;
    /**
     * @type {?ResponseStatus}
     * @description Detailed response status information */
    responseStatus;
    /**
     * @type {?OpenAiChatResponse}
     * @description Chat response */
    chatResponse;
}
export class GetActiveProvidersResponse {
    /** @param {{results?:AiProvider[],responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {AiProvider[]} */
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
export class DeleteFilesResponse {
    /** @param {{deleted?:string[],missing?:string[],failed?:string[],responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string[]} */
    deleted;
    /** @type {string[]} */
    missing;
    /** @type {string[]} */
    failed;
    /** @type {?ResponseStatus} */
    responseStatus;
}
export class MigrateArtifactResponse {
    /** @param {{filePath?:string,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    filePath;
    /** @type {?ResponseStatus} */
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
export class AdminApiKeysResponse {
    /** @param {{results?:PartialApiKey[],responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {PartialApiKey[]} */
    results;
    /** @type {ResponseStatus} */
    responseStatus;
}
export class AdminApiKeyResponse {
    /** @param {{result?:string,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    result;
    /** @type {ResponseStatus} */
    responseStatus;
}
export class AdminJobDashboardResponse {
    /** @param {{commands?:JobStatSummary[],apis?:JobStatSummary[],workers?:JobStatSummary[],today?:HourSummary[],responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {JobStatSummary[]} */
    commands;
    /** @type {JobStatSummary[]} */
    apis;
    /** @type {JobStatSummary[]} */
    workers;
    /** @type {HourSummary[]} */
    today;
    /** @type {?ResponseStatus} */
    responseStatus;
}
export class AdminJobInfoResponse {
    /** @param {{monthDbs?:string[],tableCounts?:{ [index: string]: number; },responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string[]} */
    monthDbs;
    /** @type {{ [index: string]: number; }} */
    tableCounts;
    /** @type {?ResponseStatus} */
    responseStatus;
}
export class AdminGetJobResponse {
    /** @param {{result?:JobSummary,queued?:BackgroundJob,completed?:CompletedJob,failed?:FailedJob,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {JobSummary} */
    result;
    /** @type {?BackgroundJob} */
    queued;
    /** @type {?CompletedJob} */
    completed;
    /** @type {?FailedJob} */
    failed;
    /** @type {?ResponseStatus} */
    responseStatus;
}
export class AdminGetJobProgressResponse {
    /** @param {{state?:BackgroundJobState,progress?:number,status?:string,logs?:string,durationMs?:number,error?:ResponseStatus,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {BackgroundJobState} */
    state;
    /** @type {?number} */
    progress;
    /** @type {?string} */
    status;
    /** @type {?string} */
    logs;
    /** @type {?number} */
    durationMs;
    /** @type {?ResponseStatus} */
    error;
    /** @type {?ResponseStatus} */
    responseStatus;
}
export class AdminRequeueFailedJobsJobsResponse {
    /** @param {{results?:number[],errors?:{ [index: number]: string; },responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number[]} */
    results;
    /** @type {{ [index: number]: string; }} */
    errors;
    /** @type {?ResponseStatus} */
    responseStatus;
}
export class AdminCancelJobsResponse {
    /** @param {{results?:number[],errors?:{ [index: number]: string; },responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number[]} */
    results;
    /** @type {{ [index: number]: string; }} */
    errors;
    /** @type {?ResponseStatus} */
    responseStatus;
}
export class AdminData {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'AdminData' }
    getMethod() { return 'GET' }
    createResponse() { return new AdminDataResponse() }
}
export class ConvertAudio {
    /** @param {{outputFormat?:AudioFormat,audio?:string,refId?:string,replyTo?:string,tag?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {AudioFormat}
     * @description The desired output format for the converted audio */
    outputFormat;
    /** @type {string} */
    audio;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    getTypeName() { return 'ConvertAudio' }
    getMethod() { return 'POST' }
    createResponse() { return new MediaTransformResponse() }
}
export class QueueConvertAudio {
    /** @param {{outputFormat?:AudioFormat,audio?:string,refId?:string,replyTo?:string,tag?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {AudioFormat}
     * @description The desired output format for the converted audio */
    outputFormat;
    /** @type {string} */
    audio;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    getTypeName() { return 'QueueConvertAudio' }
    getMethod() { return 'POST' }
    createResponse() { return new QueueMediaTransformResponse() }
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
export class PopulateChatSummary {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'PopulateChatSummary' }
    getMethod() { return 'GET' }
    createResponse() { return new StringsResponse() }
}
export class GetComfyModels {
    /** @param {{apiBaseUrl?:string,apiKey?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    apiBaseUrl;
    /** @type {?string} */
    apiKey;
    getTypeName() { return 'GetComfyModels' }
    getMethod() { return 'POST' }
    createResponse() { return new GetComfyModelsResponse() }
}
export class GetComfyModelMappings {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'GetComfyModelMappings' }
    getMethod() { return 'POST' }
    createResponse() { return new GetComfyModelMappingsResponse() }
}
export class GetJobStatus {
    /** @param {{jobId?:number,refId?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {?number}
     * @description Unique identifier of the background job */
    jobId;
    /**
     * @type {?string}
     * @description Client-provided identifier for the request */
    refId;
    getTypeName() { return 'GetJobStatus' }
    getMethod() { return 'POST' }
    createResponse() { return new GetJobStatusResponse() }
}
export class ActiveMediaModels {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'ActiveMediaModels' }
    getMethod() { return 'GET' }
    createResponse() { return new StringsResponse() }
}
export class TextToImage {
    /** @param {{positivePrompt?:string,negativePrompt?:string,width?:number,height?:number,batchSize?:number,model?:string,seed?:number,refId?:string,replyTo?:string,tag?:string,state?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The main prompt describing the desired image */
    positivePrompt;
    /**
     * @type {?string}
     * @description Optional prompt specifying what should not be in the image */
    negativePrompt;
    /**
     * @type {?number}
     * @description Desired width of the generated image */
    width;
    /**
     * @type {?number}
     * @description Desired height of the generated image */
    height;
    /**
     * @type {?number}
     * @description Number of images to generate in a single batch */
    batchSize;
    /**
     * @type {?string}
     * @description The AI model to use for image generation */
    model;
    /**
     * @type {?number}
     * @description Optional seed for reproducible results */
    seed;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    /**
     * @type {?string}
     * @description Optional state to associate with the request */
    state;
    getTypeName() { return 'TextToImage' }
    getMethod() { return 'POST' }
    createResponse() { return new GenerationResponse() }
}
export class ImageToImage {
    /** @param {{image?:string,positivePrompt?:string,negativePrompt?:string,denoise?:number,batchSize?:number,seed?:number,refId?:string,replyTo?:string,tag?:string,state?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The image to use as input */
    image;
    /**
     * @type {string}
     * @description Prompt describing the desired output */
    positivePrompt;
    /**
     * @type {?string}
     * @description Negative prompt describing what should not be in the image */
    negativePrompt;
    /**
     * @type {?number}
     * @description Optional specific amount of denoise to apply */
    denoise;
    /**
     * @type {?number}
     * @description Number of images to generate in a single batch */
    batchSize;
    /**
     * @type {?number}
     * @description Optional seed for reproducible results in image generation */
    seed;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    /**
     * @type {?string}
     * @description Optional state to associate with the request */
    state;
    getTypeName() { return 'ImageToImage' }
    getMethod() { return 'POST' }
    createResponse() { return new GenerationResponse() }
}
export class ImageUpscale {
    /** @param {{image?:string,seed?:number,refId?:string,replyTo?:string,tag?:string,state?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The image to upscale */
    image;
    /**
     * @type {?number}
     * @description Optional seed for reproducible results in image generation */
    seed;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    /**
     * @type {?string}
     * @description Optional state to associate with the request */
    state;
    getTypeName() { return 'ImageUpscale' }
    getMethod() { return 'POST' }
    createResponse() { return new GenerationResponse() }
}
export class ImageWithMask {
    /** @param {{positivePrompt?:string,negativePrompt?:string,image?:string,mask?:string,denoise?:number,seed?:number,refId?:string,replyTo?:string,tag?:string,state?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description Prompt describing the desired output in the masked area */
    positivePrompt;
    /**
     * @type {?string}
     * @description Negative prompt describing what should not be in the masked area */
    negativePrompt;
    /**
     * @type {string}
     * @description The image to use as input */
    image;
    /**
     * @type {string}
     * @description The mask to use as input */
    mask;
    /**
     * @type {?number}
     * @description Optional specific amount of denoise to apply */
    denoise;
    /**
     * @type {?number}
     * @description Optional seed for reproducible results in image generation */
    seed;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    /**
     * @type {?string}
     * @description Optional state to associate with the request */
    state;
    getTypeName() { return 'ImageWithMask' }
    getMethod() { return 'POST' }
    createResponse() { return new GenerationResponse() }
}
export class ImageToText {
    /** @param {{image?:string,refId?:string,replyTo?:string,tag?:string,state?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The image to convert to text */
    image;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    /**
     * @type {?string}
     * @description Optional state to associate with the request */
    state;
    getTypeName() { return 'ImageToText' }
    getMethod() { return 'POST' }
    createResponse() { return new GenerationResponse() }
}
export class QueueTextToImage {
    /** @param {{positivePrompt?:string,negativePrompt?:string,width?:number,height?:number,batchSize?:number,model?:string,seed?:number,refId?:string,replyTo?:string,tag?:string,state?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The main prompt describing the desired image */
    positivePrompt;
    /**
     * @type {?string}
     * @description Optional prompt specifying what should not be in the image */
    negativePrompt;
    /**
     * @type {?number}
     * @description Desired width of the generated image */
    width;
    /**
     * @type {?number}
     * @description Desired height of the generated image */
    height;
    /**
     * @type {?number}
     * @description Number of images to generate in a single batch */
    batchSize;
    /**
     * @type {?string}
     * @description The AI model to use for image generation */
    model;
    /**
     * @type {?number}
     * @description Optional seed for reproducible results */
    seed;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    /**
     * @type {?string}
     * @description Optional state to associate with the request */
    state;
    getTypeName() { return 'QueueTextToImage' }
    getMethod() { return 'POST' }
    createResponse() { return new QueueGenerationResponse() }
}
export class QueueImageUpscale {
    /** @param {{image?:string,seed?:number,refId?:string,replyTo?:string,tag?:string,state?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The image to upscale */
    image;
    /**
     * @type {?number}
     * @description Optional seed for reproducible results in image generation */
    seed;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    /**
     * @type {?string}
     * @description Optional state to associate with the request */
    state;
    getTypeName() { return 'QueueImageUpscale' }
    getMethod() { return 'POST' }
    createResponse() { return new QueueGenerationResponse() }
}
export class QueueImageToImage {
    /** @param {{image?:string,positivePrompt?:string,negativePrompt?:string,denoise?:number,batchSize?:number,seed?:number,refId?:string,replyTo?:string,state?:string,tag?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The image to use as input */
    image;
    /**
     * @type {string}
     * @description Prompt describing the desired output */
    positivePrompt;
    /**
     * @type {?string}
     * @description Negative prompt describing what should not be in the image */
    negativePrompt;
    /**
     * @type {?number}
     * @description Optional specific amount of denoise to apply */
    denoise;
    /**
     * @type {?number}
     * @description Number of images to generate in a single batch */
    batchSize;
    /**
     * @type {?number}
     * @description Optional seed for reproducible results in image generation */
    seed;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Optional state to associate with the request */
    state;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    getTypeName() { return 'QueueImageToImage' }
    getMethod() { return 'POST' }
    createResponse() { return new QueueGenerationResponse() }
}
export class QueueImageWithMask {
    /** @param {{positivePrompt?:string,negativePrompt?:string,image?:string,mask?:string,denoise?:number,seed?:number,refId?:string,replyTo?:string,tag?:string,state?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description Prompt describing the desired output in the masked area */
    positivePrompt;
    /**
     * @type {?string}
     * @description Negative prompt describing what should not be in the masked area */
    negativePrompt;
    /**
     * @type {string}
     * @description The image to use as input */
    image;
    /**
     * @type {string}
     * @description The mask to use as input */
    mask;
    /**
     * @type {?number}
     * @description Optional specific amount of denoise to apply */
    denoise;
    /**
     * @type {?number}
     * @description Optional seed for reproducible results in image generation */
    seed;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    /**
     * @type {?string}
     * @description Optional state to associate with the request */
    state;
    getTypeName() { return 'QueueImageWithMask' }
    getMethod() { return 'POST' }
    createResponse() { return new QueueGenerationResponse() }
}
export class QueueImageToText {
    /** @param {{image?:string,refId?:string,replyTo?:string,tag?:string,state?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The image to convert to text */
    image;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    /**
     * @type {?string}
     * @description Optional state to associate with the request */
    state;
    getTypeName() { return 'QueueImageToText' }
    getMethod() { return 'POST' }
    createResponse() { return new QueueGenerationResponse() }
}
export class ConvertImage {
    /** @param {{image?:string,outputFormat?:ImageOutputFormat}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The image file to be converted */
    image;
    /**
     * @type {ImageOutputFormat}
     * @description The desired output format for the converted image */
    outputFormat;
    getTypeName() { return 'ConvertImage' }
    getMethod() { return 'POST' }
    createResponse() { return new MediaTransformResponse() }
}
export class CropImage {
    /** @param {{x?:number,y?:number,width?:number,height?:number,image?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {number}
     * @description The X-coordinate of the top-left corner of the crop area */
    x;
    /**
     * @type {number}
     * @description The Y-coordinate of the top-left corner of the crop area */
    y;
    /**
     * @type {number}
     * @description The width of the crop area */
    width;
    /**
     * @type {number}
     * @description The height of the crop area */
    height;
    /**
     * @type {string}
     * @description The image file to be cropped */
    image;
    getTypeName() { return 'CropImage' }
    getMethod() { return 'POST' }
    createResponse() { return new MediaTransformResponse() }
}
export class WatermarkImage {
    /** @param {{image?:string,position?:WatermarkPosition,watermarkScale?:number,opacity?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The image file to be watermarked */
    image;
    /**
     * @type {WatermarkPosition}
     * @description The position of the watermark on the image */
    position;
    /**
     * @type {number}
     * @description Scale of the watermark relative */
    watermarkScale;
    /**
     * @type {number}
     * @description The opacity of the watermark (0.0 to 1.0) */
    opacity;
    getTypeName() { return 'WatermarkImage' }
    getMethod() { return 'POST' }
    createResponse() { return new MediaTransformResponse() }
}
export class ScaleImage {
    /** @param {{image?:string,width?:number,height?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The image file to be scaled */
    image;
    /**
     * @type {?number}
     * @description Desired width of the scaled image */
    width;
    /**
     * @type {?number}
     * @description Desired height of the scaled image */
    height;
    getTypeName() { return 'ScaleImage' }
    getMethod() { return 'POST' }
    createResponse() { return new MediaTransformResponse() }
}
export class QueueCropImage {
    /** @param {{x?:number,y?:number,width?:number,height?:number,image?:string,refId?:string,replyTo?:string,tag?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {number}
     * @description The X-coordinate of the top-left corner of the crop area */
    x;
    /**
     * @type {number}
     * @description The Y-coordinate of the top-left corner of the crop area */
    y;
    /**
     * @type {number}
     * @description The width of the crop area */
    width;
    /**
     * @type {number}
     * @description The height of the crop area */
    height;
    /**
     * @type {string}
     * @description The image file to be cropped */
    image;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    getTypeName() { return 'QueueCropImage' }
    getMethod() { return 'POST' }
    createResponse() { return new QueueMediaTransformResponse() }
}
export class QueueScaleImage {
    /** @param {{image?:string,width?:number,height?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The image file to be scaled */
    image;
    /**
     * @type {?number}
     * @description Desired width of the scaled image */
    width;
    /**
     * @type {?number}
     * @description Desired height of the scaled image */
    height;
    getTypeName() { return 'QueueScaleImage' }
    getMethod() { return 'POST' }
    createResponse() { return new MediaTransformResponse() }
}
export class QueueWatermarkImage {
    /** @param {{image?:string,position?:WatermarkPosition,opacity?:number,watermarkScale?:number,refId?:string,replyTo?:string,tag?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The image file to be watermarked */
    image;
    /**
     * @type {WatermarkPosition}
     * @description The position of the watermark on the image */
    position;
    /**
     * @type {number}
     * @description The opacity of the watermark (0.0 to 1.0) */
    opacity;
    /**
     * @type {number}
     * @description Scale of the watermark relative */
    watermarkScale;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    getTypeName() { return 'QueueWatermarkImage' }
    getMethod() { return 'POST' }
    createResponse() { return new QueueMediaTransformResponse() }
}
export class QueueConvertImage {
    /** @param {{image?:string,outputFormat?:ImageOutputFormat,refId?:string,replyTo?:string,tag?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The image file to be converted */
    image;
    /**
     * @type {ImageOutputFormat}
     * @description The desired output format for the converted image */
    outputFormat;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    getTypeName() { return 'QueueConvertImage' }
    getMethod() { return 'POST' }
    createResponse() { return new QueueMediaTransformResponse() }
}
export class QueryMediaTypes extends QueryDb {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    getTypeName() { return 'QueryMediaTypes' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryMediaProviders extends QueryDb {
    /** @param {{id?:number,name?:string,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?number} */
    id;
    /** @type {?string} */
    name;
    getTypeName() { return 'QueryMediaProviders' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class CreateGeneration {
    /** @param {{request?:GenerationArgs,provider?:string,state?:string,replyTo?:string,refId?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {GenerationArgs} */
    request;
    /** @type {?string} */
    provider;
    /** @type {?string} */
    state;
    /** @type {?string} */
    replyTo;
    /** @type {?string} */
    refId;
    getTypeName() { return 'CreateGeneration' }
    getMethod() { return 'POST' }
    createResponse() { return new CreateGenerationResponse() }
}
export class QueryMediaModels extends QueryDb {
    /** @param {{id?:string,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?string} */
    id;
    getTypeName() { return 'QueryMediaModels' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class GetGeneration {
    /** @param {{id?:number,refId?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?number} */
    id;
    /** @type {?string} */
    refId;
    getTypeName() { return 'GetGeneration' }
    getMethod() { return 'GET' }
    createResponse() { return new GetGenerationResponse() }
}
export class UpdateMediaProvider {
    /** @param {{id?:number,apiKey?:string,apiKeyHeader?:string,apiBaseUrl?:string,heartbeatUrl?:string,concurrency?:number,priority?:number,enabled?:boolean,models?:string[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
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
     * @description Override Base URL for the Generation Provider */
    apiBaseUrl;
    /**
     * @type {?string}
     * @description Url to check if the API is online */
    heartbeatUrl;
    /**
     * @type {?number}
     * @description How many requests should be made concurrently */
    concurrency;
    /**
     * @type {?number}
     * @description What priority to give this Provider to use for processing models */
    priority;
    /**
     * @type {?boolean}
     * @description Whether the Provider is enabled */
    enabled;
    /**
     * @type {?string[]}
     * @description The models this API Provider should process */
    models;
    getTypeName() { return 'UpdateMediaProvider' }
    getMethod() { return 'PATCH' }
    createResponse() { return new IdResponse() }
}
export class CreateMediaProvider {
    /** @param {{name?:string,apiKey?:string,apiKeyHeader?:string,apiBaseUrl?:string,heartbeatUrl?:string,concurrency?:number,priority?:number,enabled?:boolean,offlineDate?:string,models?:string[],mediaTypeId?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The name of the API Provider */
    name;
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
     * @description Base URL for the Generation Provider */
    apiBaseUrl;
    /**
     * @type {?string}
     * @description Url to check if the API is online */
    heartbeatUrl;
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
     * @type {?string}
     * @description The date the Provider was last online */
    offlineDate;
    /**
     * @type {?string[]}
     * @description Models this API Provider should process */
    models;
    /** @type {?number} */
    mediaTypeId;
    getTypeName() { return 'CreateMediaProvider' }
    getMethod() { return 'POST' }
    createResponse() { return new IdResponse() }
}
export class CreateMediaTransform {
    /** @param {{request?:MediaTransformArgs,provider?:string,state?:string,replyTo?:string,refId?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {MediaTransformArgs} */
    request;
    /** @type {?string} */
    provider;
    /** @type {?string} */
    state;
    /** @type {?string} */
    replyTo;
    /** @type {?string} */
    refId;
    getTypeName() { return 'CreateMediaTransform' }
    getMethod() { return 'POST' }
    createResponse() { return new CreateTransformResponse() }
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
export class GetOllamaModels {
    /** @param {{apiBaseUrl?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    apiBaseUrl;
    getTypeName() { return 'GetOllamaModels' }
    getMethod() { return 'GET' }
    createResponse() { return new GetOllamaModelsResponse() }
}
export class QueryAiModels extends QueryDb {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    getTypeName() { return 'QueryAiModels' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryAiTypes extends QueryDb {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    getTypeName() { return 'QueryAiTypes' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class ActiveAiModels {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'ActiveAiModels' }
    getMethod() { return 'GET' }
    createResponse() { return new StringsResponse() }
}
export class QueryAiProviders extends QueryDb {
    /** @param {{name?:string,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?string} */
    name;
    getTypeName() { return 'QueryAiProviders' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class GetWorkerStats {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'GetWorkerStats' }
    getMethod() { return 'GET' }
    createResponse() { return new GetWorkerStatsResponse() }
}
export class CancelWorker {
    /** @param {{worker?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    worker;
    getTypeName() { return 'CancelWorker' }
    getMethod() { return 'POST' }
    createResponse() { return new EmptyResponse() }
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
export class OpenAiChatCompletion extends OpenAiChat {
    /** @param {{refId?:string,provider?:string,tag?:string,messages?:OpenAiMessage[],model?:string,frequency_penalty?:number,logit_bias?:{ [index: number]: number; },logprobs?:boolean,top_logprobs?:number,max_tokens?:number,n?:number,presence_penalty?:number,response_format?:OpenAiResponseFormat,seed?:number,stop?:string[],stream?:boolean,temperature?:number,top_p?:number,tools?:OpenAiTools[],user?:string}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?string} */
    refId;
    /** @type {?string} */
    provider;
    /** @type {?string} */
    tag;
    getTypeName() { return 'OpenAiChatCompletion' }
    getMethod() { return 'POST' }
    createResponse() { return new OpenAiChatResponse() }
}
export class QueueOpenAiChatCompletion {
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
    getTypeName() { return 'QueueOpenAiChatCompletion' }
    getMethod() { return 'POST' }
    createResponse() { return new QueueOpenAiChatResponse() }
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
export class GetOpenAiChatStatus {
    /** @param {{jobId?:number,refId?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    jobId;
    /** @type {?string} */
    refId;
    getTypeName() { return 'GetOpenAiChatStatus' }
    getMethod() { return 'GET' }
    createResponse() { return new GetOpenAiChatStatusResponse() }
}
export class GetActiveProviders {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'GetActiveProviders' }
    getMethod() { return 'GET' }
    createResponse() { return new GetActiveProvidersResponse() }
}
export class ChatAiProvider {
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
    getTypeName() { return 'ChatAiProvider' }
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
export class CreateAiProvider {
    /** @param {{aiTypeId?:string,apiBaseUrl?:string,name?:string,apiKeyVar?:string,apiKey?:string,apiKeyHeader?:string,heartbeatUrl?:string,taskPaths?:{ [index: string]: string; },concurrency?:number,priority?:number,enabled?:boolean,models?:AiProviderModel[],selectedModels?:string[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The Type of this API Provider */
    aiTypeId;
    /**
     * @type {?string}
     * @description The Base URL for the API Provider */
    apiBaseUrl;
    /**
     * @type {string}
     * @description The unique name for this API Provider */
    name;
    /**
     * @type {?string}
     * @description The API Key to use for this Provider */
    apiKeyVar;
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
     * @description The URL to check if the API Provider is still online */
    heartbeatUrl;
    /**
     * @type {?{ [index: string]: string; }}
     * @description Override API Paths for different AI Requests */
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
     * @type {?AiProviderModel[]}
     * @description The models this API Provider should process */
    models;
    /**
     * @type {?string[]}
     * @description The selected models this API Provider should process */
    selectedModels;
    getTypeName() { return 'CreateAiProvider' }
    getMethod() { return 'POST' }
    createResponse() { return new IdResponse() }
}
export class UpdateAiProvider {
    /** @param {{id?:number,aiTypeId?:string,apiBaseUrl?:string,name?:string,apiKeyVar?:string,apiKey?:string,apiKeyHeader?:string,heartbeatUrl?:string,taskPaths?:{ [index: string]: string; },concurrency?:number,priority?:number,enabled?:boolean,models?:AiProviderModel[],selectedModels?:string[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /**
     * @type {?string}
     * @description The Type of this API Provider */
    aiTypeId;
    /**
     * @type {?string}
     * @description The Base URL for the API Provider */
    apiBaseUrl;
    /**
     * @type {?string}
     * @description The unique name for this API Provider */
    name;
    /**
     * @type {?string}
     * @description The API Key to use for this Provider */
    apiKeyVar;
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
     * @description The URL to check if the API Provider is still online */
    heartbeatUrl;
    /**
     * @type {?{ [index: string]: string; }}
     * @description Override API Paths for different AI Requests */
    taskPaths;
    /**
     * @type {?number}
     * @description How many requests should be made concurrently */
    concurrency;
    /**
     * @type {?number}
     * @description What priority to give this Provider to use for processing models */
    priority;
    /**
     * @type {?boolean}
     * @description Whether the Provider is enabled */
    enabled;
    /**
     * @type {?AiProviderModel[]}
     * @description The models this API Provider should process */
    models;
    /**
     * @type {?string[]}
     * @description The selected models this API Provider should process */
    selectedModels;
    getTypeName() { return 'UpdateAiProvider' }
    getMethod() { return 'PATCH' }
    createResponse() { return new IdResponse() }
}
export class DeleteAiProvider {
    /** @param {{id?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    getTypeName() { return 'DeleteAiProvider' }
    getMethod() { return 'DELETE' }
    createResponse() { }
}
export class QueryPrompts extends QueryData {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    getTypeName() { return 'QueryPrompts' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class Reload {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'Reload' }
    getMethod() { return 'POST' }
    createResponse() { return new EmptyResponse() }
}
export class ChangeAiProviderStatus {
    /** @param {{provider?:string,online?:boolean}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    provider;
    /** @type {boolean} */
    online;
    getTypeName() { return 'ChangeAiProviderStatus' }
    getMethod() { return 'POST' }
    createResponse() { return new StringResponse() }
}
export class QueueTextToSpeech {
    /** @param {{text?:string,seed?:number,model?:string,refId?:string,replyTo?:string,tag?:string,state?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The text to be converted to speech */
    text;
    /**
     * @type {?number}
     * @description Optional seed for reproducible results in speech generation */
    seed;
    /**
     * @type {?string}
     * @description The AI model to use for speech generation */
    model;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    /**
     * @type {?string}
     * @description Optional state to associate with the request */
    state;
    getTypeName() { return 'QueueTextToSpeech' }
    getMethod() { return 'POST' }
    createResponse() { return new QueueGenerationResponse() }
}
export class QueueSpeechToText {
    /** @param {{speech?:string,refId?:string,replyTo?:string,tag?:string,state?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The audio stream containing the speech to be transcribed */
    speech;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    /**
     * @type {?string}
     * @description Optional state to associate with the request */
    state;
    getTypeName() { return 'QueueSpeechToText' }
    getMethod() { return 'POST' }
    createResponse() { return new QueueGenerationResponse() }
}
export class TextToSpeech {
    /** @param {{text?:string,seed?:number,refId?:string,replyTo?:string,tag?:string,state?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The text to be converted to speech */
    text;
    /**
     * @type {?number}
     * @description Optional seed for reproducible results in speech generation */
    seed;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    /**
     * @type {?string}
     * @description Optional state to associate with the request */
    state;
    getTypeName() { return 'TextToSpeech' }
    getMethod() { return 'POST' }
    createResponse() { return new GenerationResponse() }
}
export class SpeechToText {
    /** @param {{speech?:string,refId?:string,replyTo?:string,tag?:string,state?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The audio stream containing the speech to be transcribed */
    speech;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    /**
     * @type {?string}
     * @description Optional state to associate with the request */
    state;
    getTypeName() { return 'SpeechToText' }
    getMethod() { return 'POST' }
    createResponse() { return new GenerationResponse() }
}
export class ScaleVideo {
    /** @param {{video?:string,width?:number,height?:number,refId?:string,replyTo?:string,tag?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The video file to be scaled */
    video;
    /**
     * @type {?number}
     * @description Desired width of the scaled video */
    width;
    /**
     * @type {?number}
     * @description Desired height of the scaled video */
    height;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    getTypeName() { return 'ScaleVideo' }
    getMethod() { return 'POST' }
    createResponse() { return new MediaTransformResponse() }
}
export class WatermarkVideo {
    /** @param {{video?:string,watermark?:string,position?:WatermarkPosition,refId?:string,replyTo?:string,tag?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The video file to be watermarked */
    video;
    /**
     * @type {string}
     * @description The image file to use as a watermark */
    watermark;
    /**
     * @type {?WatermarkPosition}
     * @description Position of the watermark */
    position;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    getTypeName() { return 'WatermarkVideo' }
    getMethod() { return 'POST' }
    createResponse() { return new MediaTransformResponse() }
}
export class ConvertVideo {
    /** @param {{outputFormat?:ConvertVideoOutputFormat,video?:string,refId?:string,replyTo?:string,tag?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {ConvertVideoOutputFormat}
     * @description The desired output format for the converted video */
    outputFormat;
    /** @type {string} */
    video;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    getTypeName() { return 'ConvertVideo' }
    getMethod() { return 'POST' }
    createResponse() { return new MediaTransformResponse() }
}
export class CropVideo {
    /** @param {{x?:number,y?:number,width?:number,height?:number,video?:string,refId?:string,replyTo?:string,tag?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {number}
     * @description The X-coordinate of the top-left corner of the crop area */
    x;
    /**
     * @type {number}
     * @description The Y-coordinate of the top-left corner of the crop area */
    y;
    /**
     * @type {number}
     * @description The width of the crop area */
    width;
    /**
     * @type {number}
     * @description The height of the crop area */
    height;
    /** @type {string} */
    video;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    getTypeName() { return 'CropVideo' }
    getMethod() { return 'POST' }
    createResponse() { return new MediaTransformResponse() }
}
export class TrimVideo {
    /** @param {{startTime?:string,endTime?:string,video?:string,refId?:string,replyTo?:string,tag?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The start time of the trimmed video (format: HH:MM:SS) */
    startTime;
    /**
     * @type {?string}
     * @description The end time of the trimmed video (format: HH:MM:SS) */
    endTime;
    /** @type {string} */
    video;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    getTypeName() { return 'TrimVideo' }
    getMethod() { return 'POST' }
    createResponse() { return new MediaTransformResponse() }
}
export class QueueScaleVideo {
    /** @param {{video?:string,width?:number,height?:number,refId?:string,replyTo?:string,tag?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The video file to be scaled */
    video;
    /**
     * @type {?number}
     * @description Desired width of the scaled video */
    width;
    /**
     * @type {?number}
     * @description Desired height of the scaled video */
    height;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    getTypeName() { return 'QueueScaleVideo' }
    getMethod() { return 'POST' }
    createResponse() { return new QueueMediaTransformResponse() }
}
export class QueueWatermarkVideo {
    /** @param {{video?:string,watermark?:string,position?:WatermarkPosition,refId?:string,replyTo?:string,tag?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The video file to be watermarked */
    video;
    /**
     * @type {string}
     * @description The image file to use as a watermark */
    watermark;
    /**
     * @type {?WatermarkPosition}
     * @description Position of the watermark */
    position;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    getTypeName() { return 'QueueWatermarkVideo' }
    getMethod() { return 'POST' }
    createResponse() { return new QueueMediaTransformResponse() }
}
export class QueueConvertVideo {
    /** @param {{outputFormat?:ConvertVideoOutputFormat,video?:string,refId?:string,replyTo?:string,tag?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {ConvertVideoOutputFormat}
     * @description The desired output format for the converted video */
    outputFormat;
    /** @type {string} */
    video;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    getTypeName() { return 'QueueConvertVideo' }
    getMethod() { return 'POST' }
    createResponse() { return new QueueMediaTransformResponse() }
}
export class QueueCropVideo {
    /** @param {{x?:number,y?:number,width?:number,height?:number,video?:string,refId?:string,replyTo?:string,tag?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {number}
     * @description The X-coordinate of the top-left corner of the crop area */
    x;
    /**
     * @type {number}
     * @description The Y-coordinate of the top-left corner of the crop area */
    y;
    /**
     * @type {number}
     * @description The width of the crop area */
    width;
    /**
     * @type {number}
     * @description The height of the crop area */
    height;
    /** @type {string} */
    video;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    getTypeName() { return 'QueueCropVideo' }
    getMethod() { return 'POST' }
    createResponse() { return new QueueMediaTransformResponse() }
}
export class QueueTrimVideo {
    /** @param {{startTime?:string,endTime?:string,video?:string,refId?:string,replyTo?:string,tag?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description The start time of the trimmed video (format: HH:MM:SS) */
    startTime;
    /**
     * @type {?string}
     * @description The end time of the trimmed video (format: HH:MM:SS) */
    endTime;
    /** @type {string} */
    video;
    /**
     * @type {?string}
     * @description Optional client-provided identifier for the request */
    refId;
    /**
     * @type {?string}
     * @description Optional queue or topic to reply to */
    replyTo;
    /**
     * @type {?string}
     * @description Tag to identify the request */
    tag;
    getTypeName() { return 'QueueTrimVideo' }
    getMethod() { return 'POST' }
    createResponse() { return new QueueMediaTransformResponse() }
}
export class GetArtifact {
    /** @param {{path?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    path;
    getTypeName() { return 'GetArtifact' }
    getMethod() { return 'GET' }
    createResponse() { return new Blob() }
}
export class DeleteFile {
    /** @param {{path?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    path;
    getTypeName() { return 'DeleteFile' }
    getMethod() { return 'DELETE' }
    createResponse() { return new EmptyResponse() }
}
export class DeleteFiles {
    /** @param {{paths?:string[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string[]} */
    paths;
    getTypeName() { return 'DeleteFiles' }
    getMethod() { return 'POST' }
    createResponse() { return new DeleteFilesResponse() }
}
export class GetVariant {
    /** @param {{variant?:string,path?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    variant;
    /** @type {string} */
    path;
    getTypeName() { return 'GetVariant' }
    getMethod() { return 'GET' }
    createResponse() { return new Blob() }
}
export class MigrateArtifact {
    /** @param {{path?:string,date?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    path;
    /** @type {?string} */
    date;
    getTypeName() { return 'MigrateArtifact' }
    getMethod() { return 'POST' }
    createResponse() { return new MigrateArtifactResponse() }
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
export class AdminQueryApiKeys {
    /** @param {{id?:number,search?:string,userId?:string,userName?:string,orderBy?:string,skip?:number,take?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?number} */
    id;
    /** @type {string} */
    search;
    /** @type {string} */
    userId;
    /** @type {string} */
    userName;
    /** @type {string} */
    orderBy;
    /** @type {?number} */
    skip;
    /** @type {?number} */
    take;
    getTypeName() { return 'AdminQueryApiKeys' }
    getMethod() { return 'GET' }
    createResponse() { return new AdminApiKeysResponse() }
}
export class AdminCreateApiKey {
    /** @param {{name?:string,userId?:string,userName?:string,scopes?:string[],features?:string[],restrictTo?:string[],expiryDate?:string,notes?:string,refId?:number,refIdStr?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    name;
    /** @type {string} */
    userId;
    /** @type {string} */
    userName;
    /** @type {string[]} */
    scopes;
    /** @type {string[]} */
    features;
    /** @type {string[]} */
    restrictTo;
    /** @type {?string} */
    expiryDate;
    /** @type {string} */
    notes;
    /** @type {?number} */
    refId;
    /** @type {string} */
    refIdStr;
    /** @type {{ [index: string]: string; }} */
    meta;
    getTypeName() { return 'AdminCreateApiKey' }
    getMethod() { return 'POST' }
    createResponse() { return new AdminApiKeyResponse() }
}
export class AdminUpdateApiKey {
    /** @param {{id?:number,name?:string,userId?:string,userName?:string,scopes?:string[],features?:string[],restrictTo?:string[],expiryDate?:string,cancelledDate?:string,notes?:string,refId?:number,refIdStr?:string,meta?:{ [index: string]: string; },reset?:string[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    name;
    /** @type {string} */
    userId;
    /** @type {string} */
    userName;
    /** @type {string[]} */
    scopes;
    /** @type {string[]} */
    features;
    /** @type {string[]} */
    restrictTo;
    /** @type {?string} */
    expiryDate;
    /** @type {?string} */
    cancelledDate;
    /** @type {string} */
    notes;
    /** @type {?number} */
    refId;
    /** @type {string} */
    refIdStr;
    /** @type {{ [index: string]: string; }} */
    meta;
    /** @type {string[]} */
    reset;
    getTypeName() { return 'AdminUpdateApiKey' }
    getMethod() { return 'PATCH' }
    createResponse() { return new EmptyResponse() }
}
export class AdminDeleteApiKey {
    /** @param {{id?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?number} */
    id;
    getTypeName() { return 'AdminDeleteApiKey' }
    getMethod() { return 'DELETE' }
    createResponse() { return new EmptyResponse() }
}
export class AdminJobDashboard {
    /** @param {{from?:string,to?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    from;
    /** @type {?string} */
    to;
    getTypeName() { return 'AdminJobDashboard' }
    getMethod() { return 'GET' }
    createResponse() { return new AdminJobDashboardResponse() }
}
export class AdminJobInfo {
    /** @param {{month?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    month;
    getTypeName() { return 'AdminJobInfo' }
    getMethod() { return 'GET' }
    createResponse() { return new AdminJobInfoResponse() }
}
export class AdminGetJob {
    /** @param {{id?:number,refId?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?number} */
    id;
    /** @type {?string} */
    refId;
    getTypeName() { return 'AdminGetJob' }
    getMethod() { return 'GET' }
    createResponse() { return new AdminGetJobResponse() }
}
export class AdminGetJobProgress {
    /** @param {{id?:number,logStart?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {?number} */
    logStart;
    getTypeName() { return 'AdminGetJobProgress' }
    getMethod() { return 'GET' }
    createResponse() { return new AdminGetJobProgressResponse() }
}
export class AdminQueryBackgroundJobs extends QueryDb {
    /** @param {{id?:number,refId?:string,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?number} */
    id;
    /** @type {?string} */
    refId;
    getTypeName() { return 'AdminQueryBackgroundJobs' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class AdminQueryJobSummary extends QueryDb {
    /** @param {{id?:number,refId?:string,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?number} */
    id;
    /** @type {?string} */
    refId;
    getTypeName() { return 'AdminQueryJobSummary' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class AdminQueryScheduledTasks extends QueryDb {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    getTypeName() { return 'AdminQueryScheduledTasks' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class AdminQueryCompletedJobs extends QueryDb {
    /** @param {{month?:string,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?string} */
    month;
    getTypeName() { return 'AdminQueryCompletedJobs' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class AdminQueryFailedJobs extends QueryDb {
    /** @param {{month?:string,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?string} */
    month;
    getTypeName() { return 'AdminQueryFailedJobs' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class AdminRequeueFailedJobs {
    /** @param {{ids?:number[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?number[]} */
    ids;
    getTypeName() { return 'AdminRequeueFailedJobs' }
    getMethod() { return 'POST' }
    createResponse() { return new AdminRequeueFailedJobsJobsResponse() }
}
export class AdminCancelJobs {
    /** @param {{ids?:number[],worker?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?number[]} */
    ids;
    /** @type {?string} */
    worker;
    getTypeName() { return 'AdminCancelJobs' }
    getMethod() { return 'GET' }
    createResponse() { return new AdminCancelJobsResponse() }
}
export class QueryMediaTypesData extends QueryData {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    getTypeName() { return 'QueryMediaTypesData' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryAiModelsData extends QueryData {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    getTypeName() { return 'QueryAiModelsData' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryAiTypesData extends QueryData {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    getTypeName() { return 'QueryAiTypesData' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class DeleteMediaProvider {
    /** @param {{id?:number,name?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?number} */
    id;
    /** @type {?string} */
    name;
    getTypeName() { return 'DeleteMediaProvider' }
    getMethod() { return 'DELETE' }
    createResponse() { return new IdResponse() }
}

