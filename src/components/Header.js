function Header({ toggleContainerVisibility, containerVisible }) {
  return (
    <div className="contentHeader">
      <img src="/images/belii-fon.png" alt="Paper" />
      <div className="paper">
        <img src="/images/paper.png" alt="Paper" />
        <button onClick={toggleContainerVisibility} className="showFormStiker">
          {containerVisible ? 'Скрыть форму ' : 'Создать стикер'}
        </button>
      </div>
    </div>
  );
}

export default Header;

