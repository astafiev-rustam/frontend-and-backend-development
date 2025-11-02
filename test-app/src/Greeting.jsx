function Greeting() {
  const userName = "Айнура";
  const currentTime = new Date().getHours();
  let timeOfDay;
  
  if (currentTime < 12) {
    timeOfDay = "Доброе утро";
  } else if (currentTime < 18) {
    timeOfDay = "Добрый день";
  } else {
    timeOfDay = "Добрый вечер";
  }

  return (
    <div className="greeting-container">
      <h1>{timeOfDay}, {userName}!</h1>
      <p>Рады видеть вас в нашем приложении.</p>
    </div>
  );
}

export default Greeting;