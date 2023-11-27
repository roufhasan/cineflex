const Container = ({ children, px }) => {
  return <div className={`max-w-[1920px] mx-auto px-[${px}]`}>{children}</div>;
};

export default Container;
