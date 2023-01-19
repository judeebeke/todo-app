const AddColor = () => {

        return(
        <form>
            <input type="text" name="colorName" id="title" required />
            <input type="color" name="color" id="color" required />
            <button type="submit">ADD</button>
        </form>
    )
}  

export default AddColor;