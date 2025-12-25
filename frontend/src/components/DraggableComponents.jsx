import React from 'react'
import { useDrag } from 'react-dnd'

//important
function DraggableComponents(elem) {
  const [collected, drag] = useDrag(() => ({
    type: "decoration",

    //  must pass src so drop knows what to render
    item: { id: elem.id, src: elem.src },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
<div
  title={elem.id}
  className={`flex items-center flex-wrap justify-center rounded-full bg-black h-11 w-11 md:h-13 md:w-13 hover:scale-110 transition-all duration-300 ${
    collected.isDragging ? "opacity-35" : ""
  }`}
>

      <img
        ref={drag}                 //  makes it draggable
        src={elem.src}
        className="h-9 w-9 md:h-10 md:w-10"
        draggable={false}          // prevents native image drag
      />
    </div>
  )
}

export default DraggableComponents
