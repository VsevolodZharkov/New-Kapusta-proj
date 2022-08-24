import s from './LoaderLineTable.module.css';

export const LoaderLineTable = () => {
  return (
    <>
      <div className={s.load_wrapp}>
        <div className={s.load_3}>
          <div className={s.line}></div>
          <div className={s.line}></div>
          <div className={s.line}></div>
        </div>
      </div>
    </>
  );
};
