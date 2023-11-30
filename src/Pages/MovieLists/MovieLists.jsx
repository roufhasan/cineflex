const MovieLists = ({ apiPath, title }) => {
  console.log(apiPath, title);
  return (
    <div>
      <div>{apiPath}</div>
      <div>{title}</div>
    </div>
  );
};

export default MovieLists;
