function FormAddSticker({
  fontSizeText,
  handleChangeFontSizeAdd,
  handleChangeFontSizeMinus,
  backGround,
  handleChangeBackgroundColor,
  colorText,
  handleChangeTextColor,
  clickBtn,
}) {
  return (
    <>
      <div className="fontSizeText">
        <h3>Размер шрифта: {fontSizeText} PX</h3>
        <button onClick={handleChangeFontSizeAdd}>+</button>
        <button onClick={handleChangeFontSizeMinus}>-</button>
      </div>
      <div className="backGround">
        <h3>Фон стикера</h3>
        <select value={backGround} onChange={handleChangeBackgroundColor}>
          <option></option>
          <option className="backGroundWhite">Белый</option>
          <option className="backGroundRed">Красный</option>
          <option className="backGroundOrange">Оранжевый</option>
          <option className="backGroundYelloy">Желтый</option>
          <option className="backGroundGreen">Зеленый</option>
          <option className="backGroundBlue">Синий</option>
          <option className="backGroundLightBlue">Голубой</option>
          <option className="backGroundViolet">Фиолетовый</option>
          <option className="backGroundPink">Розовый</option>
          <option className="backGroundLightGreen">Салатовый</option>
        </select>
      </div>
      <div className="backGround">
        <h3>Цвет шрифта </h3>
        <select value={colorText} onChange={handleChangeTextColor}>
          <option></option>
          <option className="colorWhite">Белый</option>
          <option className="colorRed">Красный</option>
          <option className="colorOrange">Оранжевый</option>
          <option className="colorYelloy">Желтый</option>
          <option className="colorGreen">Зеленый</option>
          <option className="colorBlue">Синий</option>
          <option className="colorLightBlue">Голубой</option>
          <option className="colorViolet">Фиолетовый</option>
          <option className="colorPink">Розовый</option>
          <option className="colorLightGreen">Салатовый</option>
        </select>
      </div>
      <button className="saveStiker" onClick={clickBtn}>
        Сохранить
      </button>
    </>
  );
}

export default FormAddSticker;
