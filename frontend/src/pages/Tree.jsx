import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router";
import { useDrop } from "react-dnd";
import * as htmlToImage from "html-to-image";
import { ThemeContext } from "../contexts/ThemeProvider";
import { Rnd } from "react-rnd";
import { toPng, toJpeg } from "html-to-image";
import DraggableComponents from "../components/DraggableComponents";

const DECORATIONS = [
  { id: "gingerbread", src: "assets/treedecor/gingerbread.png" },
  { id: "globe", src: "assets/treedecor/globe.png" },
  { id: "leaf", src: "assets/treedecor/leaf.png" },
  { id: "ornament", src: "assets/treedecor/ornament.png" },
  { id: "sock", src: "assets/treedecor/sock.png" },
  { id: "wreath", src: "assets/treedecor/wreath.png" },
  { id: "star", src: "assets/treedecor/star.png" },
  { id: "ornament-2", src: "assets/treedecor/ornament-2.png" },
  { id: "candy", src: "assets/treedecor/candy.png" },
];

export default function Tree() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);
  const [items, setItems] = useState([]);
  const [treeSize, setTreeSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const updateSize = () => {
      const tree = document.getElementById("tree-arena");
      if (!tree) return;

      const rect = tree.getBoundingClientRect();
      setTreeSize({
        width: rect.width,
        height: rect.height,
      });
    };

    updateSize(); 
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  async function handleDownload() {

    await htmlToImage
      .toJpeg(document.getElementById('tree-arena'), { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-christmas-tree.jpeg';
        link.href = dataUrl;
        link.click();
      });
  }

  const [, dropref] = useDrop(() => ({
    accept: "decoration",
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const treeRect = document
        .getElementById("tree-arena")
        .getBoundingClientRect();

      const x = offset.x - treeRect.left;
      const y = offset.y - treeRect.top;
      const xPercent = (x / treeRect.width) * 100
      const yPercent = (y / treeRect.height) * 100
      const size = 25
      setItems((prev) => [
        ...prev,
        { id: Date.now(), src: item.src, xPercent, yPercent, size },
      ]);
    },
  }));

  return (
    <div className="min-h-screen text-center flex flex-col md:flex-row">
      
      <div
        id="tree-arena"
        ref={dropref}
        className="relative flex-1 md:w-1/2 w-full h-[50vh] md:h-screen"
      >
        <img
          src="/assets/treedecor/christmas_tree.png"
          alt="tree"
          className="w-full h-full object-contain pointer-events-none"
        />

       

        {treeSize.width > 0 && items.map((item) => (
          <Rnd className="touch-none"

            key={item.id}
            bounds="parent"
            size={{ width: item.size, height: item.size }}
            position={{
              x: (item.xPercent / 100) * treeSize.width,
              y: (item.yPercent / 100) * treeSize.height,
            }}
            onDragStop={(e, d) => {
              const tree = document.getElementById("tree-arena");
              const rect = tree.getBoundingClientRect();

              setItems((prev) =>
                prev.map((i) =>
                  i.id === item.id
                    ? {
                      ...i,
                      xPercent: (d.x / rect.width) * 100,
                      yPercent: (d.y / rect.height) * 100,
                    }
                    : i
                )
              );
            }}
            onResizeStop={(e, dir, ref, delta, pos) => {
              const tree = document.getElementById("tree-arena");
              const rect = tree.getBoundingClientRect();

              setItems((prev) =>
                prev.map((i) =>
                  i.id === item.id
                    ? {
                      ...i,
                      size: ref.offsetWidth,
                      xPercent: (pos.x / rect.width) * 100,
                      yPercent: (pos.y / rect.height) * 100,
                    }
                    : i
                )
              );
            }}
          >
            <img
              src={item.src}
              className="w-full h-full pointer-events-none select-none"
              alt=""
            />
          </Rnd>
        ))}


      </div>

      <div className="md:w-1/2 flex-1 w-full bg-green-200 flex flex-col h-[50vh] md:h-screen">


        <div className="flex-1 flex-wrap justify-between p-2  flex items-center">

          {DECORATIONS.map((d) => (
            <DraggableComponents key={d.id} id={d.id} src={d.src} />
          ))}
        </div>
        <div className="flex-1">

          <h2 className="text-xl md:text-2xl">Drag and drop to decorate the tree!</h2>
          <h3>Resize and move ornaments as you wish.</h3>
          <h3>Download your decorated tree and share further.</h3>
          <button onClick={() => { setItems([]) }} className="button-89 m-2">Clear tree</button>
        </div>

        <div title="download btn" className="flex-1 flex flex-wrap items-center justify-center">
          <button onClick={handleDownload} className="hover:scale-115 active:scale-95 active:opacity-45 transition-all duration-300">
            <img
              id="tea_share"
              src="/assets/treedecor/tea.png"
              className="h-40 w-auto"
              alt="tea"
            />
          </button>

          <NavLink to="/">
            <button className="button-53 m-1">Home</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
