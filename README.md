# ai-server

Website: [openai.servicestack.net](https://openai.servicestack.net).

## News

 - [May 2025 Update](https://servicestack.net/posts/ai-server-2025-05)

Self-hosted private gateway to manage access to multiple LLM APIs, Ollama endpoints, Media APIs, Comfy UI and FFmpeg Agents.

```mermaid
flowchart TB
    A[AI Server] 
    A --> D{LLM APIs}
    A --> C{Ollama}
    A --> E{Media APIs}
    A --> F{Comfy UI 
    + 
    FFmpeg}
    D --> D1[OpenRouter / OpenAI / Mistral AI / Google Cloud / GroqCloud]
    E --> E1[Replicate / dall-e-3 / Text to speech]
    F --> F1[Diffusion / Whisper / TTS]
```

## Self Hosted AI Server API Gateway

AI Server is a way to orchestrate your AI requests through a single self-hosted private gateway to control what AI Providers your Apps with only a single typed client integration. It can be used to process LLM, AI, Diffusion and image transformation requests which are dynamically delegated across multiple configured providers which can include any 
Ollama endpoint, OpenRouter / OpenAI / Mistral AI / Google Cloud / GroqCloud LLM APIs, Replicate / Open AI/Dall-e-3 / 
Text to speech Media APIs, Diffusion / Whisper / Text to Speech from Comfy UI and FFmpeg Agents.

### Comfy UI FFmpeg Agents

As part of the overall AI Server solution we're also maintaining [Docker Client Agents](https://docs.servicestack.net/ai-server/comfy-extension) configured with Comfy UI, Whisper and FFmpeg which can be installed on GPU Servers to provide a full stack media processing pipeline for video and audio files which can be used as part of your AI workflows.

See [AI Server Docs](https://docs.servicestack.net/ai-server/) for documentation on 
[installation](https://docs.servicestack.net/ai-server/quickstart) and 
[configuration](https://docs.servicestack.net/ai-server/configuration).

## Built In UIs

In addition to its backend APIs, it also includes several built in UI's for utlizing AI Server features:

### Open AI Chat

![](https://raw.githubusercontent.com/ServiceStack/ai-server/refs/heads/main/AiServer/wwwroot/img/uis/Chat.webp)

### Text to Image

![](https://raw.githubusercontent.com/ServiceStack/ai-server/refs/heads/main/AiServer/wwwroot/img/uis/TextToImage.webp)

### Image to Text

![](https://raw.githubusercontent.com/ServiceStack/ai-server/refs/heads/main/AiServer/wwwroot/img/uis/ImageToText.webp)

### Image to Image

![](https://raw.githubusercontent.com/ServiceStack/ai-server/refs/heads/main/AiServer/wwwroot/img/uis/ImageUpscale.webp)

### Speech to Text

![](https://raw.githubusercontent.com/ServiceStack/ai-server/refs/heads/main/AiServer/wwwroot/img/uis/SpeechToText.webp)

### Text to Speech

![](https://raw.githubusercontent.com/ServiceStack/ai-server/refs/heads/main/AiServer/wwwroot/img/uis/TextToSpeech.webp)

## Admin UIs

Use Admin UIs to manage AI and Media Providers and API Key Access

![](https://raw.githubusercontent.com/ServiceStack/ai-server/refs/heads/main/AiServer/wwwroot/img/uis/admin/dashboard.webp)

Increase capacity by adding AI Providers that can process LLM Requests

![](https://raw.githubusercontent.com/ServiceStack/ai-server/refs/heads/main/AiServer/wwwroot/img/uis/admin/ai-providers.webp)

Add local Ollama endpoints and control which of their Models can be used

![](https://raw.githubusercontent.com/ServiceStack/ai-server/refs/heads/main/AiServer/wwwroot/img/uis/admin/ai-providers-new-ollama.webp)

Glossary of LLM models available via Ollama or LLM APIs

![](https://raw.githubusercontent.com/ServiceStack/ai-server/refs/heads/main/AiServer/wwwroot/img/uis/admin/ai-models.webp)

List of different AI Provider Types that AI Server supports

![](https://raw.githubusercontent.com/ServiceStack/ai-server/refs/heads/main/AiServer/wwwroot/img/uis/admin/ai-types.webp)

Increase capacity by adding AI Providers that can process Media & FFmpeg Requests

![](https://raw.githubusercontent.com/ServiceStack/ai-server/refs/heads/main/AiServer/wwwroot/img/uis/admin/media-providers.webp)

Add a new Replicate API Media Provider and which diffusion models to enable

![](https://raw.githubusercontent.com/ServiceStack/ai-server/refs/heads/main/AiServer/wwwroot/img/uis/admin/media-providers-replicate.webp)

Add a new Comfy UI Agent and control which of its models can be used

![](https://raw.githubusercontent.com/ServiceStack/ai-server/refs/heads/main/AiServer/wwwroot/img/uis/admin/media-providers-comfyui.webp)

Glossary of different Media Provider Types that AI Server supports

![](https://raw.githubusercontent.com/ServiceStack/ai-server/refs/heads/main/AiServer/wwwroot/img/uis/admin/media-types.webp)

View built-in and interactive API Analytics

![](https://raw.githubusercontent.com/ServiceStack/ai-server/refs/heads/main/AiServer/wwwroot/img/uis/admin/analytics.webp)

View completed and failed Background Jobs from Jobs Dashboard

![](https://raw.githubusercontent.com/ServiceStack/ai-server/refs/heads/main/AiServer/wwwroot/img/uis/admin/background-jobs.webp)

Monitor Live progress of executing AI Requests

![](https://raw.githubusercontent.com/ServiceStack/ai-server/refs/heads/main/AiServer/wwwroot/img/uis/admin/background-jobs-live.webp)

View all currently pending and executing AI Requests

![](https://raw.githubusercontent.com/ServiceStack/ai-server/refs/heads/main/AiServer/wwwroot/img/uis/admin/background-jobs-queue.webp)

Use Admin UI to manage API Keys that can access AI Server APIs and Features

![](https://raw.githubusercontent.com/ServiceStack/ai-server/refs/heads/main/AiServer/wwwroot/img/uis/admin/api-keys.webp)

Edit API Keys for fine grain control over API Keys access and scope

![](https://raw.githubusercontent.com/ServiceStack/ai-server/refs/heads/main/AiServer/wwwroot/img/uis/admin/api-keys-edit.webp)

View detailed API Request logging

![](https://raw.githubusercontent.com/ServiceStack/ai-server/refs/heads/main/AiServer/wwwroot/img/uis/admin/logging.webp)
