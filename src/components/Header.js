import logo from "../images/logo.png";

export const Header = ({ handleSearch }) => {
  return (
    <div className="bg-orange-700 p-2">
      <div className="container mx-auto flex justify-between items-center gap-8">
        <div className="flex-1">
          <input
            className="w-full p-1 rounded-2xl pl-3 focus:outline-none"
            type="text"
            placeholder="search"
            onChange={(e) => handleSearch(e)}></input>
        </div>
        <img className="w-20" src={logo} alt="logo" />
      </div>
    </div>
  );
};
