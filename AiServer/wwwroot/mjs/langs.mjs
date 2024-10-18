
import { marked } from "./markdown.mjs"
import hljs from "../lib/mjs/highlight.mjs"
import hljsDart from "../lib/mjs/dart.min.js"
import hljsFsharp from "../lib/mjs/fsharp.min.js"

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