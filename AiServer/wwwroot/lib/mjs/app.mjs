import { map } from "@servicestack/client"
import { useUtils } from "@servicestack/vue"

/** @param {KeyboardEvent} e */
export function hasModifierKey(e) {
    return e.shiftKey || e.ctrlKey || e.altKey || e.metaKey || e.code === 'MetaLeft' || e.code === 'MetaRight'
}
/** Is element an Input control
 * @param {Element} e */
let InputTags = 'INPUT,SELECT,TEXTAREA'.split(',')
export function isInput(e) {
    return e && InputTags.indexOf(e.tagName) >= 0
}

export function keydown(e, ctx) {
    const { unRefs } = useUtils()
    const { canPrev, canNext, nextSkip, take, results, selected, clearFilters } = unRefs(ctx)
    if (hasModifierKey(e) || isInput(e.target) || results.length === 0) return
    if (e.key === 'Escape') {
        clearFilters()
        return
    }
    if (e.key === 'ArrowLeft' && canPrev) {
        routes.to({ skip:nextSkip(-take) })
        return
    } else if (e.key === 'ArrowRight' && canNext) {
        routes.to({ skip:nextSkip(take) })
        return
    }
    let row = selected
    if (!row) return routes.to({ show:map(results[0], x => x.id) || '' })
    let activeIndex = results.findIndex(x => x.id === row.id)
    let navs = {
        ArrowUp:   activeIndex - 1,
        ArrowDown: activeIndex + 1,
        Home: 0,
        End: results.length -1,
    }
    let nextIndex = navs[e.key]
    if (nextIndex != null) {
        if (nextIndex === -1) nextIndex = results.length - 1
        routes.to({ show: map(results[nextIndex % results.length], x => x.id) })
        if (e.key.startsWith('Arrow')) {
            e.preventDefault()
        }
    }
}