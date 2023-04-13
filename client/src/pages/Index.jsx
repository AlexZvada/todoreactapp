import  img   from '../images/index_page/unAuth.jpg'
export const Index = () => {
  return (
      <div className="main-page">
        <div className="main-page-text">
          <h2 className="main-page-text-title">Achieve more</h2>
          <p className="main-page-text-par">
            Add tasks and organize your life. Our To Do List offers you a simple
            and intuitive interface with which you can schedule a variety of
            tasks. Do you have a lot of things that you can't remember? Our
            service will help you reach ever greater heights every day and will
            help you not to forget about a variety of tasks!
          </p>
        </div>
        <div className="main-page-img-wrapper">
          <img src={img} alt="" className="main-page-img" />
        </div>
      </div>
  );
};
