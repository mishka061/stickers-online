import React, { useEffect, useRef, useState } from "react";
import TextareaForm from "./TextareaForm";
import FormAddSticker from "./FormAddSticker";
import ShowSticker from "./ShowSticker";
import InfoText from "./InfoText";
import Header from "./Header";
import { nanoid } from "nanoid";

function Stickers() {
  const [value, setValue] = useState("");
  const [fontSizeText, setFontSize] = useState(16);
  const [backGround, setBackgroundColor] = useState("");
  const [colorText, setTextColor] = useState("");
  const [stickers, setStickers] = useState([]);
  const [containerVisible, setContainerVisible] = useState(true); 
  const ref = useRef(null);

  useEffect(() => {
    const storedStickers = localStorage.getItem("stickers");
    if (storedStickers) {
      setStickers(JSON.parse(storedStickers));
    }
  }, []);

  function changeTextarea(event) {
    setValue(event.target.value);
  }

  const handleChangeFontSizeAdd = () => {
    setFontSize(fontSizeText + 1);
  };

  const handleChangeFontSizeMinus = () => {
    setFontSize(fontSizeText - 1);
  };

  const handleChangeBackgroundColor = (event) => {
    setBackgroundColor(event.target.value);
  };

  const handleChangeTextColor = (event) => {
    setTextColor(event.target.value);
  };

  function clickBtn() {
    const newSticker = {
      id: nanoid(),
      value: value,
      fontSize: fontSizeText,
      backGround: backGround,
      colorText: colorText,
      isEdit: false,
      positionX: 0, 
      positionY: 0,
    };
    setValue("");
    if (ref.current) {
      const widthSticker = ref.current.offsetWidth;
      const heightSticker = ref.current.offsetHeight;
      setStickers([
        ...stickers,
        { ...newSticker, widthSticker, heightSticker },
      ]);
      updateStickersInLocalStorage([
        ...stickers,
        { ...newSticker, widthSticker, heightSticker },
      ]);
    }
  }

  function updateStickersInLocalStorage(stickers) {
    localStorage.setItem("stickers", JSON.stringify(stickers));
  }

  const updateStickerPosition = (id, newX, newY) => {
    setStickers((prevStickers) => {
      return prevStickers.map((sticker) => {
        if (sticker.id === id) {
          return { ...sticker, positionX: newX, positionY: newY };
        }
        return sticker;
      });
    });
    updateStickersInLocalStorage(stickers);
  };

  function deleteSticker(id) {
    const updatedStickers = stickers.filter((elem) => elem.id !== id);
    setStickers(updatedStickers);
    updateStickersInLocalStorage(updatedStickers);
  }

  function editSticker(id, field, event) {
    const updatedStickers = stickers.map((sticker) => {
      if (sticker.id === id) {
        sticker[field] = event.target.value;
      }
      return sticker;
    });
    setStickers(updatedStickers);
    updateStickersInLocalStorage(updatedStickers);
  }

  function toggleMode(id) {
    setStickers(
      stickers.map((sticker) => {
        if (sticker.id === id) {
          sticker.isEdit = !sticker.isEdit;
        }
        return sticker;
      })
    );
  }
  const toggleContainerVisibility = () => {
    setContainerVisible(!containerVisible);
  };

  return (
    <div className="stikerContent">
      <Header
        toggleContainerVisibility={toggleContainerVisibility}
        containerVisible={containerVisible}
      />
      {containerVisible && (
        <div className="container">
          <div className="contentContainer">
            <TextareaForm
              ref={ref}
              value={value}
              changeTextarea={changeTextarea}
            />
            <div className="setParameters">
              <FormAddSticker
                fontSizeText={fontSizeText}
                handleChangeFontSizeAdd={handleChangeFontSizeAdd}
                handleChangeFontSizeMinus={handleChangeFontSizeMinus}
                backGround={backGround}
                handleChangeBackgroundColor={handleChangeBackgroundColor}
                colorText={colorText}
                handleChangeTextColor={handleChangeTextColor}
                clickBtn={clickBtn}
              />
            </div>
          </div>
          <InfoText />
        </div>
      )}
      <div className="container2">
        <ul>
          {stickers.map((sticker) => (
            <li key={sticker.id} style={{ listStyleType: "none", padding: 0 }}>
              <ShowSticker
                sticker={sticker}
                deleteSticker={deleteSticker}
                id={sticker.id}
                isEdit={sticker.isEdit}
                toggleMode={toggleMode}
                editSticker={editSticker}
                updateStickerPosition={updateStickerPosition}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Stickers;
