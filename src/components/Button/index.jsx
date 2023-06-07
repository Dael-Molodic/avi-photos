// style
import { Button } from "@mui/material"


function CustomButton({ text, onClick, style, variant, disabled}) {

    return (
        <Button onClick={onClick} sx={{...style}} variant={variant} disabled={disabled}>
            {text}
        </Button>
    )

}

export default CustomButton
