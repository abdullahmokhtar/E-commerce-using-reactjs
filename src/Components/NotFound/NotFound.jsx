import notFoundImg from "../../assets/images/error.svg";

const Notfound = () => {
  return (
    <div>
      <img src={notFoundImg} className="w-50 m-auto d-block py-5" alt="Not Found Page" />
    </div>
  );
};

export default Notfound;
