import Style from './ReportsItemsCard.module.css';
import { Icons } from '../Icons/IconsForListStatisticts';

export const ReportsItemsCard = ({
  total,
  category,
  id,
  item,
  handelClickOnCategory,

  currentItem,
}) => {
  const active = Number(currentItem) === Number(id);

  return (
    <tr className={Style.positionTr}>
      <td
        className={active ? Style.active : Style.item_spend}
        id={id}
        onClick={evt => {
          const currentIdItem = evt.currentTarget.id;
          handelClickOnCategory(item, currentIdItem);
        }}
      >
        <span className={Style.item_text}>{total + '.00'}</span>

        <span
          className={
            active ? Style.item_backgroundSvgActive : Style.item_backgroundSvg
          }
        ></span>
        <Icons
          name={category}
          className={active ? Style.item_spendSvgActive : Style.item_spendSvg}
          color="#071F41"
          width="56"
          height="56"
        />

        <span className={Style.item_text}>{category}</span>
      </td>
    </tr>
  );
};

// import Style from './ReportsItemsCard.module.css';
// import { Icons } from '../Icons/IconsForListStatisticts';
// import { useState } from 'react';

// export const ReportsItemsCard = ({
//   total,
//   category,
//   id,
//   item,
//   handelClickOnCategory,
// }) => {
//   const [active, setActive] = useState(false);

//   const addActiveClass = id => {
//     const a = false;
//     // handelClickOnCategory(item);
//     if (id === id) {
//       setActive(!active);
//     }
//   };

//   return (
//     <li
//       className={active ? Style.active : Style.item_spend}
//       key={id}
//       onClick={() => {
//         handelClickOnCategory(item);
//       }}
//       onMouseDownCapture={e => {
//         addActiveClass(id);
//       }}
//     >
//       <p className={Style.item_text}>{total + '.00'}</p>
//       <div className={Style.item_backgroundDiv}>
//         <div className={Style.item_backgroundSvg}>
//           <Icons
//             name={category}
//             className={Style.item_spendSvg}
//             color="#071F41"
//             width="56"
//             height="56"
//           />
//         </div>
//       </div>

//       <p className={Style.item_textDown}>{category}</p>
//     </li>
//   );
// };
