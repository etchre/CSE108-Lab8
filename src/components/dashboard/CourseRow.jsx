import RowItem from "./RowItem.jsx";

//addons is an array of tailwind style strings, i.e. an array of styles
function CourseRow({
    items,
    addons=[],
    itemAddons=[],
}) {
  const gridColStrings = [
    'grid-cols-1',
    'grid-cols-1',
    'grid-cols-2',
    'grid-cols-3',
    'grid-cols-4',
    'grid-cols-5'
  ]

  let styleAddons = ''

  if(items.length <= 5) {
    styleAddons += gridColStrings[items.length]
    styleAddons += ' '
  }

  for (const addon of addons) {
    styleAddons += addon;
    styleAddons += ' '
  }

  return (
    <div className={styleAddons+"w-full grid"}>
      {items.map((item, index) => {
        return <RowItem
          addons={itemAddons}
          key={item+index}
        >{item}</RowItem>
      })}
    </div>
  )
}

export default CourseRow;