import { IoRemoveCircleOutline, IoAddCircleOutline } from "react-icons/io5";
import "./../../cssGeneral/CssGeneral.css";

const ItemCount = ({ min, stock, count, setCount }) => {
  const add = () => {
    if (count < stock) setCount(count + 1);
  };
  const subtract = () => {
    if (count > min) setCount(count - 1);
  };
  return (
    <div margin="auto" flexdirection="colum" width="185px" height="100px">
      <div>
        {stock > 0 && (
          <div className="divMasMenosCantidad">
            <IoRemoveCircleOutline
              style={{ fontSize: 30 }}
              onClick={subtract}
            />
            <span className="textoCantidadNumero">{count}</span>
            <IoAddCircleOutline
              style={{ fontSize: 30 }}
              disabled={count === stock}
              onClick={add}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default ItemCount;
