
import { marked } from "../markdown.mjs"
import hljs from "highlight.mjs"

/*! `dart` grammar compiled for Highlight.js 11.10.0 */
var hljsDart=(()=>{"use strict";return e=>{const n={className:"subst",
    variants:[{begin:"\\$[A-Za-z0-9_]+"}]},a={className:"subst",variants:[{
        begin:/\$\{/,end:/\}/}],keywords:"true false null this is new super"},t={
    className:"string",variants:[{begin:"r'''",end:"'''"},{begin:'r"""',end:'"""'},{
        begin:"r'",end:"'",illegal:"\\n"},{begin:'r"',end:'"',illegal:"\\n"},{
        begin:"'''",end:"'''",contains:[e.BACKSLASH_ESCAPE,n,a]},{begin:'"""',end:'"""',
        contains:[e.BACKSLASH_ESCAPE,n,a]},{begin:"'",end:"'",illegal:"\\n",
        contains:[e.BACKSLASH_ESCAPE,n,a]},{begin:'"',end:'"',illegal:"\\n",
        contains:[e.BACKSLASH_ESCAPE,n,a]}]};a.contains=[e.C_NUMBER_MODE,t]
;const i=["Comparable","DateTime","Duration","Function","Iterable","Iterator","List","Map","Match","Object","Pattern","RegExp","Set","Stopwatch","String","StringBuffer","StringSink","Symbol","Type","Uri","bool","double","int","num","Element","ElementList"],r=i.map((e=>e+"?"))
;return{name:"Dart",keywords:{
        keyword:["abstract","as","assert","async","await","base","break","case","catch","class","const","continue","covariant","default","deferred","do","dynamic","else","enum","export","extends","extension","external","factory","false","final","finally","for","Function","get","hide","if","implements","import","in","interface","is","late","library","mixin","new","null","on","operator","part","required","rethrow","return","sealed","set","show","static","super","switch","sync","this","throw","true","try","typedef","var","void","when","while","with","yield"],
        built_in:i.concat(r).concat(["Never","Null","dynamic","print","document","querySelector","querySelectorAll","window"]),
        $pattern:/[A-Za-z][A-Za-z0-9_]*\??/},
    contains:[t,e.COMMENT(/\/\*\*(?!\/)/,/\*\//,{subLanguage:"markdown",relevance:0
    }),e.COMMENT(/\/{3,} ?/,/$/,{contains:[{subLanguage:"markdown",begin:".",
            end:"$",relevance:0}]}),e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,{
        className:"class",beginKeywords:"class interface",end:/\{/,excludeEnd:!0,
        contains:[{beginKeywords:"extends implements"},e.UNDERSCORE_TITLE_MODE]
    },e.C_NUMBER_MODE,{className:"meta",begin:"@[A-Za-z]+"},{begin:"=>"}]}}})();

/*! `fsharp` grammar compiled for Highlight.js 11.10.0 */
var hljsFsharp=(()=>{"use strict";function e(e){
    return RegExp(e.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&"),"m")}function n(e){
    return e?"string"==typeof e?e:e.source:null}function t(e){return i("(?=",e,")")}
    function i(...e){return e.map((e=>n(e))).join("")}function a(...e){const t=(e=>{
        const n=e[e.length-1]
        ;return"object"==typeof n&&n.constructor===Object?(e.splice(e.length-1,1),n):{}
    })(e);return"("+(t.capture?"":"?:")+e.map((e=>n(e))).join("|")+")"}return n=>{
        const r={scope:"keyword",match:/\b(yield|return|let|do|match|use)!/
        },o=["bool","byte","sbyte","int8","int16","int32","uint8","uint16","uint32","int","uint","int64","uint64","nativeint","unativeint","decimal","float","double","float32","single","char","string","unit","bigint","option","voption","list","array","seq","byref","exn","inref","nativeptr","obj","outref","voidptr","Result"],s={
            keyword:["abstract","and","as","assert","base","begin","class","default","delegate","do","done","downcast","downto","elif","else","end","exception","extern","finally","fixed","for","fun","function","global","if","in","inherit","inline","interface","internal","lazy","let","match","member","module","mutable","namespace","new","of","open","or","override","private","public","rec","return","static","struct","then","to","try","type","upcast","use","val","void","when","while","with","yield"],
            literal:["true","false","null","Some","None","Ok","Error","infinity","infinityf","nan","nanf"],
            built_in:["not","ref","raise","reraise","dict","readOnlyDict","set","get","enum","sizeof","typeof","typedefof","nameof","nullArg","invalidArg","invalidOp","id","fst","snd","ignore","lock","using","box","unbox","tryUnbox","printf","printfn","sprintf","eprintf","eprintfn","fprintf","fprintfn","failwith","failwithf"],
            "variable.constant":["__LINE__","__SOURCE_DIRECTORY__","__SOURCE_FILE__"]},c={
            variants:[n.COMMENT(/\(\*(?!\))/,/\*\)/,{contains:["self"]
            }),n.C_LINE_COMMENT_MODE]},l={scope:"variable",begin:/``/,end:/``/
        },u=/\B('|\^)/,p={scope:"symbol",variants:[{match:i(u,/``.*?``/)},{
                match:i(u,n.UNDERSCORE_IDENT_RE)}],relevance:0},f=({includeEqual:n})=>{let r
        ;r=n?"!%&*+-/<=>@^|~?":"!%&*+-/<>@^|~?"
        ;const o=i("[",...Array.from(r).map(e),"]"),s=a(o,/\./),c=i(s,t(s)),l=a(i(c,s,"*"),i(o,"+"))
        ;return{scope:"operator",match:a(l,/:\?>/,/:\?/,/:>/,/:=/,/::?/,/\$/),
            relevance:0}},d=f({includeEqual:!0}),b=f({includeEqual:!1}),m=(e,r)=>({
            begin:i(e,t(i(/\s*/,a(/\w/,/'/,/\^/,/#/,/``/,/\(/,/{\|/)))),beginScope:r,
            end:t(a(/\n/,/=/)),relevance:0,keywords:n.inherit(s,{type:o}),
            contains:[c,p,n.inherit(l,{scope:null}),b]
        }),g=m(/:/,"operator"),h=m(/\bof\b/,"keyword"),y={
            begin:[/(^|\s+)/,/type/,/\s+/,/[a-zA-Z_](\w|')*/],beginScope:{2:"keyword",
                4:"title.class"},end:t(/\(|=|$/),keywords:s,contains:[c,n.inherit(l,{scope:null
            }),p,{scope:"operator",match:/<|>/},g]},E={scope:"computation-expression",
            match:/\b[_a-z]\w*(?=\s*\{)/},_={
            begin:[/^\s*/,i(/#/,a("if","else","endif","line","nowarn","light","r","i","I","load","time","help","quit")),/\b/],
            beginScope:{2:"meta"},end:t(/\s|$/)},v={
            variants:[n.BINARY_NUMBER_MODE,n.C_NUMBER_MODE]},w={scope:"string",begin:/"/,
            end:/"/,contains:[n.BACKSLASH_ESCAPE]},A={scope:"string",begin:/@"/,end:/"/,
            contains:[{match:/""/},n.BACKSLASH_ESCAPE]},S={scope:"string",begin:/"""/,
            end:/"""/,relevance:2},C={scope:"subst",begin:/\{/,end:/\}/,keywords:s},O={
            scope:"string",begin:/\$"/,end:/"/,contains:[{match:/\{\{/},{match:/\}\}/
            },n.BACKSLASH_ESCAPE,C]},x={scope:"string",begin:/(\$@|@\$)"/,end:/"/,
            contains:[{match:/\{\{/},{match:/\}\}/},{match:/""/},n.BACKSLASH_ESCAPE,C]},R={
            scope:"string",begin:/\$"""/,end:/"""/,contains:[{match:/\{\{/},{match:/\}\}/
            },C],relevance:2},k={scope:"string",
            match:i(/'/,a(/[^\\']/,/\\(?:.|\d{3}|x[a-fA-F\d]{2}|u[a-fA-F\d]{4}|U[a-fA-F\d]{8})/),/'/)
        };return C.contains=[x,O,A,w,k,r,c,l,g,E,_,v,p,d],{name:"F#",
            aliases:["fs","f#"],keywords:s,illegal:/\/\*/,classNameAliases:{
                "computation-expression":"keyword"},contains:[r,{variants:[R,x,O,S,A,w,k]
            },c,l,y,{scope:"meta",begin:/\[</,end:/>\]/,relevance:2,contains:[l,S,A,w,k,v]
            },h,g,E,_,v,p,d]}}})();

export const langs = {
    csharp:     'C#',
    typescript: 'TypeScript',
    mjs:        'JS',
    python:     'Python',
    dart:       'Dart',
    php:        'PHP',
    java:       'Java',
    kotlin:     'Kotlin',
    swift:      'Swift',
    fsharp:     'F#',
    vbnet:      'VB.NET',
}

const csharp = `
using ServiceStack;

var client = new JsonApiClient(baseUrl);
client.BearerToken = apiKey;

var api = await client.ApiAsync(new OpenAiChatCompletion {
    Model = "mixtral:8x22b",
    Messages = [
        new() {
            Role = "user",
            Content = "What's the capital of France?"
        }
    ],
    MaxTokens = 50
});
`
const typescript = `
import { JsonServiceClient } from "@servicestack/client"
import { OpenAiChatCompletion } from "./dtos"

const client = new JsonServiceClient(baseUrl)
client.bearerToken = apiKey

const api = await client.api(new OpenAiChatCompletion({
    model: "mixtral:8x22b",
    messages: [
      { role:"user", content:"What's the capital of France?" }
    ],
    maxTokens: 50,
}))
`
const mjs = `
import { JsonServiceClient } from "@servicestack/client"
import { OpenAiChatCompletion } from "./dtos.mjs"

const client = new JsonServiceClient(baseUrl)
client.bearerToken = apiKey

const api = await client.api(new OpenAiChatCompletion({
    model: "mixtral:8x22b",
    messages: [
      { role:"user", content:"What's the capital of France?" }
    ],
    maxTokens: 50,
}))
`
const python = `
from servicestack import JsonServiceClient
from my_app.dtos import *

client = JsonServiceClient(base_url)
client.bearer_token = api_key

response = client.send(OpenAiChatCompletion(
    model="mixtral:8x22b",
    messages=[
        OpenAiMessage(
            "role": "user",
            "content": "What's the capital of France?"
        )
    ],
    max_tokens=50
))
`
const dart = `
import 'dart:io';
import 'dart:typed_data';
import 'package:servicestack/client.dart';

var client = ClientFactory.api(baseUrl);

var response = await client.send(OpenAiChatCompletion(
    ..model = "mixtral:8x22b",
    ..messages = [
        OpenAiMessage()
            ..role="user"
            ..content="What's the capital of France?"
    ],
    ..max_tokens = 50
));
`
const php = `
use ServiceStack\\JsonServiceClient;
use dtos\\OpenAiChatCompletion;
use dtos\\OpenAiMessage;

$client = new JsonServiceClient(baseUrl);
$client->bearerToken = apiKey;

/** @var {OpenAiChatCompletionResponse} $response */
$response = $client->send(new OpenAiChatCompletion(
    model: "mixtral:8x22b",
    messages: [
        new OpenAiMessage(
            role: "user",
            content: "What's the capital of France?"
        )
    ],
    max_tokens: 50
));
`
const java = `
import net.servicestack.client.*;
import java.util.Collections;

var request = new OpenAiChatCompletion();
request.setModel("mixtral:8x22b")
    .setMaxTokens(50)
    .setMessages(Utils.createList(new OpenAiMessage()
        .setRole("user")
        .setContent("What's the capital of France?")
    ));
OpenAiChatResponse response = client.send(request);
`
const kotlin = `
package myapp
import net.servicestack.client.*

val client = JsonServiceClient(baseUrl)
client.bearerToken = apiKey

val response = client.send(OpenAiChatCompletion().apply {
    model = "mixtral:8x22b"
    messages = arrayListOf(OpenAiMessage().apply {
        role = "user"
        content = "What's the capital of France?"
    })
    maxTokens = 50
});
`
const swift = `
import Foundation
import ServiceStack

let client = JsonServiceClient(baseUrl:baseUrl)
client.bearerToken = apiKey

let request = OpenAiChatCompletion()
request.model = "mixtral:8x22b"
let msg = OpenAiMessage()
msg.role = "user"
msg.content = "What's the capital of France?"
request.messages = [msg]
request.max_tokens = 50

let response = try client.send(request)
`
const fsharp = `
open ServiceStack
open ServiceStack.Text

let client = new JsonApiClient(baseUrl)
client.BearerToken <- apiKey

let response = client.Send(new OpenAiChatCompletion(
    Model = "mixtral:8x22b",
    Messages = ResizeArray [
        OpenAiMessage(
            Role = "user",
            Content = "What's the capital of France?"
        )
    ],
    MaxTokens = 50))
`
const vbnet = `
Imports ServiceStack
Imports ServiceStack.Text

Dim client = New JsonApiClient(baseUrl)
client.BearerToken = apiKey

Dim api = Await client.ApiAsync(New OpenAiChatCompletion() 
    With {
        .Model = "mixtral:8x22b",
        .Messages = New List(Of OpenAiMessage) From {
            New OpenAiMessage With {
                .Role = "user",
                .Content = "What's the capital of France?"
            }
        },
        .MaxTokens = 50
    })
`

export const openAi = (() => {
    hljs.registerLanguage('dart', hljsDart)
    hljs.registerLanguage('fsharp', hljsFsharp)

    const ret = {
        code: {
            csharp,
            typescript,
            mjs,
            python,
            dart,
            php,
            java,
            kotlin,
            swift,
            fsharp,
            vbnet,
        },
        html: {}
    }

    Object.keys(ret.code).forEach(lang => {
        ret.html[lang] = marked.parse(
            '```' + lang + '\n'
            + ret.code[lang]
            + '\n```')
    })

    return ret
})()

export default {
    template:`

  <div class="mx-auto max-w-7xl px-6 lg:px-8">

    <div class="mb-4">
      <div class="sm:hidden">
        <label for="tabs" class="sr-only">Select a tab</label>
        <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
        <select id="tabs" name="tabs" @change="routes.to({ lang:$event.target.value })" 
            class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
          <option v-for="(label,lang) in langs" :value="lang">{{label}}</option>
        </select>
      </div>
      <div class="hidden sm:block">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex" aria-label="Tabs">
            <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
            <div v-for="(label,lang) in langs" v-href="{ lang }" 
                :class="['cursor-pointer w-1/4 border-b-2 px-1 py-2 text-center text-sm font-medium text-gray-500', lang == (routes.lang || 'csharp') ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700']">
                <div class="flex flex-col justify-center items-center">
                    <img :src="'/img/langs/' + lang + '.svg'" class="w-8 h-8">
                    <span class="mt-3">{{label}}</span>
                </div>
            </div>
          </nav>
        </div>
      </div>
    </div>

    <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
      <div class="lg:pr-8 lg:pt-4">
        
        <slot></slot>
        
      </div>
      <div>
          <div class="flex items-center pt-20">
            <div v-html="openAi.html[routes.lang || 'csharp']"></div>
          </div>
            
            <nav class="flex" aria-label="Breadcrumb">
              <ol role="list" class="flex items-center space-x-4">
                <li>
                  <div>
                    <a :href="(baseUrl ?? '') + '/ui/OpenAiChatCompletion?tab=code&detailSrc=OpenAiChat&lang=' + (routes.lang || 'csharp')" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700" aria-current="page">
                        Usage from {{langs[routes.lang || 'csharp']}}
                    </a>
                  </div>
                </li>
                <li>
                  <div class="flex items-center">
                    <svg class="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                    </svg>
                    <a :href="(baseUrl ?? '') + '/ui/OpenAiChatCompletion?tab=details'" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                        API Explorer Docs
                    </a>
                  </div>
                </li>
                <li>
                  <div class="flex items-center">
                    <svg class="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                    </svg>
                    <a href="https://docs.servicestack.net/ai-server/chat" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                        About Open AI Chat API
                    </a>
                  </div>
                </li>
              </ol>
            </nav>
      </div>
    </div>
    
  </div>`,
    props: {
        baseUrl:String,
        routes:Object,
    },
    setup() {
        return { langs, openAi, }
    }
}
