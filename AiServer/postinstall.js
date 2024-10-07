// Usage: npm install

const writeTo = './wwwroot/lib'
const defaultPrefix = 'https://unpkg.com'
const files = {
  mjs: {
      'vue.mjs':                         '/vue@3/dist/vue.esm-browser.js',
      'vue.min.mjs':                     '/vue@3/dist/vue.esm-browser.prod.js',
      'servicestack-client.mjs':         '/@servicestack/client@2/dist/servicestack-client.mjs',
      'servicestack-client.min.mjs':     '/@servicestack/client@2/dist/servicestack-client.min.mjs',
      'servicestack-vue.mjs':            '/@servicestack/vue@3/dist/servicestack-vue.mjs',
      'servicestack-vue.min.mjs':        '/@servicestack/vue@3/dist/servicestack-vue.min.mjs',
      'highlight.mjs':                   '/@highlightjs/cdn-assets/es/highlight.min.js',
      // 'marked.mjs':                      'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js',
  },
  typings: {
      'vue/index.d.ts':                  '/vue@3/dist/vue.d.ts',
      '@vue/compiler-core.d.ts':         '/@vue/compiler-core@3/dist/compiler-core.d.ts',
      '@vue/compiler-dom.d.ts':          '/@vue/compiler-dom@3/dist/compiler-dom.d.ts',
      '@vue/runtime-dom.d.ts':           '/@vue/runtime-dom@3/dist/runtime-dom.d.ts',
      '@vue/runtime-core.d.ts':          '/@vue/runtime-core@3/dist/runtime-core.d.ts',
      '@vue/reactivity.d.ts':            '/@vue/reactivity@3/dist/reactivity.d.ts',
      '@vue/shared.d.ts':                '/@vue/shared@3/dist/shared.d.ts',
      '@servicestack/client/index.d.ts': '/@servicestack/client/dist/index.d.ts',
      '@servicestack/vue/index.d.ts':    '/@servicestack/vue@3/dist/index.d.ts',
      // 'marked/index.d.ts':               'https://cdn.jsdelivr.net/npm/marked/lib/marked.d.ts',
      'highlight/index.d.ts':            'https://raw.githubusercontent.com/highlightjs/highlight.js/main/types/index.d.ts',
  },
  data: {
      'prompts.md':                     'https://raw.githubusercontent.com/f/awesome-chatgpt-prompts/main/README.md',
  }
}// && {}

const path = require('path')
const fs = require('fs').promises
const http = require('http')
const https = require('https')

const requests = []
Object.keys(files).forEach(dir => {
    const dirFiles = files[dir]
    Object.keys(dirFiles).forEach(name => {
        let url = dirFiles[name]
        if (url.startsWith('/'))
            url = defaultPrefix + url
        const toFile = path.join(writeTo, dir, name)
        requests.push(fetchDownload(url, toFile, 5))
    })
})

;(async () => {
    await Promise.all(requests)

    const fileStream = require('fs').createReadStream(path.join(writeTo, 'data', 'prompts.md'))
    const rl = require('node:readline').createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    })

    let prompts = []
    let afterPrompts = false
    let name = ''
    let value = ''
    let i = 0;
    for await (const line of rl) {
        if (line.trim() === '') continue
        if (!afterPrompts && !line.startsWith('# Prompts')) continue
        afterPrompts = true
        
        if (!name) {
            if (line.startsWith('## ')) {
                name = line.substring(3).trim()
            }
        } else {
            
            if (line.startsWith('>')) {
                let trimmed = line.substring(1).trim()
                if (trimmed.endsWith('<br/>')) {
                    trimmed = trimmed.substring(0, trimmed.length - 5)
                }
                value += trimmed + '\n'
            }
            
            if (value) {
                if (!line.startsWith('>')) {
                    value = value.trim()
                    let id = name.replace(/Act as a?n?/g,'')
                        .replace(/[`.]/g,'')
                        .toLowerCase()
                        .trim()
                        .replaceAll(' ','-')
                    prompts.push({id, name, value})
                    name = ''
                    value = ''
                }
            }
        }
    }
    
    prompts.push({id:'pvq-app', name:'pvq.app', value:`
You are an IT expert helping a user with a technical issue.
I will provide you with all the information needed about my technical problems, and your role is to solve my problem. 
You should use your computer science, network infrastructure, and IT security knowledge to solve my problem
using data from StackOverflow, Hacker News, and GitHub of content like issues submitted, closed issues, 
number of stars on a repository, and overall StackOverflow activity.
Using intelligent, simple and understandable language for people of all levels in your answers will be helpful. 
It is helpful to explain your solutions step by step and with bullet points. 
Try to avoid too many technical details, but use them when necessary. 
I want you to reply with the solution, not write any explanations.`.trim()})

    const json = JSON.stringify(prompts, null, 4)
    await fs.writeFile(path.join(writeTo, 'data', 'prompts.json'), json)
})()

async function fetchDownload(url, toFile, retries) {
    const toDir = path.dirname(toFile)
    await fs.mkdir(toDir, { recursive: true })
    for (let i=retries; i>=0; --i) {
        try {
            let r = await fetch(url)
            if (!r.ok) {
                throw new Error(`${r.status} ${r.statusText}`);
            }
            let txt = await r.text()
            console.log(`writing ${url} to ${toFile}`)
            await fs.writeFile(toFile, txt)
            return
        } catch (e) {
            console.log(`get ${url} failed: ${e}${i > 0 ? `, ${i} retries remaining...` : ''}`)
        }
    }
}