import RowItem from "./RowItem.jsx";

//addons is an array of tailwind style strings, i.e. an array of styles
function CourseRow({items, addons=[], itemAddons=[]}) {

  let styleAddons = ''

  for (const addon of addons) {
    styleAddons += addon;
    styleAddons += ' '
  }

  let gridStyle = 'grid-cols-'+items.length;

  return (
    <div className={styleAddons+"w-full grid "+gridStyle}>
      {items.map((item, index) => {
        return <RowItem addons={itemAddons} key={index+item}>{item}</RowItem>
      })}
    </div>
  )
}

export default CourseRow;