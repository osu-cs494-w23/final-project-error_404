import classes from "./InputSearch.module.css";

const InputSearch = () => {
  return (
    <div className={classes.search_group}>
      <input placeholder="Search For Valorant's data" />
    </div>
  );
};

export default InputSearch;
