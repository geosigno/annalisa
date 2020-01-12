

const colors = {
    error: '#cf6262',
    success: '#62cf89',
    typo: '#111',
    lightGray: '#f7f7f7',
    mediumGray: '#ddd'
}

const StyleGuide = () => (

    <table>
        {colors.map( (color, index) => (
            {(index % 5 ?
                <tr>
                :
                
            )}
               
               
               </tr> 
            }
        )}
    </table>

)