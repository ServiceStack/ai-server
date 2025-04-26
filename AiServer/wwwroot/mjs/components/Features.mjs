import { icons, uiLabel } from "../utils.mjs"

import Chat from "./Chat.mjs"
import TextToImage from "./TextToImage.mjs"
import ImageToText from "./ImageToText.mjs"
import ImageToImage from "./ImageToImage.mjs"
import ImageUpscale from "./ImageUpscale.mjs"
import SpeechToText from "./SpeechToText.mjs"
import TextToSpeech from "./TextToSpeech.mjs"
import ConvertImage from "./ConvertImage.mjs"

export const Components = {
    Chat,
    TextToImage,
    ImageToText,
    ImageToImage,
    ImageUpscale,
    SpeechToText,
    TextToSpeech,
    ConvertImage,
}

const F = args => {
    const id = Object.keys(args)[0]
    return { id, component:args[id] }
}
export const Features = (() => {
   const ret = {
       chat: {
           ...F({ Chat }),
       },
       txt2img: {
           ...F({ TextToImage }),
       },
       img2txt: {
           ...F({ ImageToText }),
       },
       img2img: {
           ...F({ ImageToImage }),
       },
       upscale: {
           ...F({ ImageUpscale }),
       },
       spch2txt: {
           ...F({ SpeechToText }),
       },
       txt2spch: {
           ...F({ TextToSpeech }),
       },
       imgconv: {
           ...F({ ConvertImage }),
       },
       //Transform: 'ffmpeg',
   }
    Object.keys(ret).forEach(prefix => {
        const feature = ret[prefix]
        feature.label ??= uiLabel(feature.id)
        feature.icon ??= icons[prefix]
        feature.prefix ??= prefix
    })
    //console.log('features', ret)
    return ret
})()

export const FeatureGroups = [
    {
        label:'Text',
        icon:icons.chat,
        features:[
            Features.chat,
            Features.img2txt,
            Features.spch2txt,
        ],
    },
    {
        label:'Image',
        icon:icons.txt2img,
        features:[
            Features.txt2img,
            Features.img2img,
            Features.upscale,
        ]
    },
    {
        label:'Audio',
        icon:icons.spch2txt,
        features:[
            Features.txt2spch,
        ]
    },
    {
        label:'Transform Image',
        icon:icons.imgtransform,
        features:[
            Features.imgconv,
        ],
    },
    // {
    //     label:'Transform Video',
    //     icon:icons.vidtransform,
    //     features:[],
    // }
]
