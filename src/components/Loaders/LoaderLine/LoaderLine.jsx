import s from './LoaderLine.module.css';

export const LoaderLine = () => {
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
