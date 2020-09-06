import { Node } from 'tiptap'
import { wrappingInputRule, setBlockType, toggleWrap } from 'tiptap-commands'

export default class AlignLeft extends Node {

  get name() {
    return 'aligncenter'
  }

  get schema() {
    return {
      content: 'block+',
      group: 'block',
      defining: true,
      draggable: false,
      parseDOM: [
        { tag: 'p' },
      ],
      toDOM: () => ['p', { style: 'text-align: center' }, 0],
    }
  }

  commands({ type, schema }) {
    return () => toggleWrap(type)
  }

  keys({ type }) {
    return {
      'Ctrl->': toggleWrap(type),
    }
  }

  inputRules({ type }) {
    return [
      wrappingInputRule(/^\s*>\s$/, type),
    ]
  }

}