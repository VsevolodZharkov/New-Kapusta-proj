import s from './LoaderBubble.module.css';

export const LoaderBubble = () => {
  return (
    <>
      <div className={s.load_wrapp}>
        <div className={s.load_9}>
          <div className={s.spinner}>
            <div className={s.bubble_1}></div>
            <div className={s.bubble_2}></div>
          </div>
        </div>
      </div>
    </>
  );
};
