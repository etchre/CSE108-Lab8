import RowItem from "./RowItem.jsx";

//addons is an array of tailwind style strings, i.e. an array of styles
function CourseRow({items, addons=[], itemAddons=[]}) {

  let styleAddons = ''

  for (const addon of addons) {
    styleAddons += addon;
    styleAddons += ' '
  }

  return (
    <div className={styleAddons+""}>
      {items.map((item, index) => {
        return <RowItem addons={itemAddons} key={item+index}>{item}</RowItem>
      })}
    </div>
  )
}

export default CourseRow;