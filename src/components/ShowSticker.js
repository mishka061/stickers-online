import React, { useState, useEffect } from "react";

function ShowSticker({
  sticker,
  deleteSticker,
  id,
  isEdit,
  toggleMode,
  editSticker,
  updateStickerPosition,
}) {
  const colorMap = {
    Белый: "rgb(255, 255, 255)",
    Красный: "rgb(252, 26, 26)",
    Оранжевый: "rgb(255, 172, 19)",
    Желтый: "yellow",
    Зеленый: "rgb(0, 197, 0)",
    Голубой: "rgb(0, 225, 255)",
    Синий: "rgb(0, 0, 255)",
    Фиолетовый: "rgb(255, 96, 255)",
    Розовый: "rgb(255, 199, 208)",
    Салатовый: "greenyellow",
  };
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const {
    value,
    backGround,
    colorText,
    fontSize,
    widthSticker,
    heightSticker,
  } = sticker;
  const backgroundColor = backGround
    ? colorMap[backGround] || backGround
    : "transparent";
  const textColor = colorText ? colorMap[colorText] || colorText : "black";

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({
    x: sticker.positionX || 0,
    y: sticker.positionY || 200,
  });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    localStorage.setItem(`sticker-${id}-position`, JSON.stringify(position));
  }, [position, id]);

  useEffect(() => {
    const storedPosition = localStorage.getItem(`sticker-${id}-position`);
    if (storedPosition) {
      setPosition(JSON.parse(storedPosition));
    }
  }, [id]);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const deltaX = event.clientX - startPosition.x;
      const deltaY = event.clientY - startPosition.y;
      const newX = position.x + deltaX;
      const newY = position.y + deltaY;
      setPosition({ x: newX, y: newY });
      setStartPosition({ x: event.clientX, y: event.clientY });
      updateStickerPosition(id, newX, newY);
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const newStiskerStyle = {
    backgroundColor: backgroundColor,
    color: textColor,
    fontSize: `${Math.min(fontSize, windowSize.width * 0.03)}px`, 
    width: `${Math.min(widthSticker, windowSize.width * 0.2)}px`, 
    height: `${Math.min(heightSticker, windowSize.height * 0.2)}px`,
    border: "1px solid black",
    overflow: "hidden",
    position: "absolute",
    top: position.y + "px",
    left: position.x + "px",
    cursor: "move",
  };
  const handleToggleMode = () => {
    toggleMode(id);
  };

  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      <li
        style={newStiskerStyle}
        className="newStisker"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className="divTitle">
          {isEdit ? (
            <input
              value={value}
              onChange={(event) => editSticker(id, "value", event)}
            />
          ) : (
            <span>{value}</span>
          )}
        </div>
        <div className="newStiskerSubDiv">
          {isEdit ? (
            <img src="/images/save.png" alt="save" onClick={handleToggleMode} />
          ) : (
            <img
              src="/images/miscellaneous.png"
              alt="miscellaneous"
              onClick={handleToggleMode}
            />
          )}

          <img
            src="/images/delete.png"
            alt="delete"
            onClick={() => deleteSticker(id)}
          />
        </div>
      </li>
    </ul>
  );
}

export default ShowSticker;
