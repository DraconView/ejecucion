import {useContext} from 'react'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import { HiShoppingCart } from "react-icons/hi";
import CartContext from '../../context/CartContext'

const CartIcon = () => {
    const { cantTotal } = useContext(CartContext)

    return (
        <div style={{ paddingRight: '5px'  }}>
            <IconButton>
                <Badge
                    badgeContent={cantTotal()}
                    style={{ color: '#808080' }}
                    showZero
                    overlap="rectangular"
                >
                    <HiShoppingCart style={{ color: '#FEBA20', fontSize: '30px'}} />
                </Badge>
            </IconButton>
        </div>
    )
}

export default CartIcon
