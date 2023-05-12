export function InfiniteRouter() {
  return (
    <div className="flex items-center justify-center">
      <div
        style={{
          '--slide-item-gap': '1rem',
          '--slide-item-width': 'calc(20cqw - var(--slide-item-gap))',
          '--slide-item-count': '5',
        }}
        className="w-[500px] overflow-hidden">
        <div className="flex animate-infinite-scroll flex-nowrap gap-[--slide-item-gap] whitespace-nowrap">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="min-w-[--slide-item-width] bg-blue-100">
              {i + 1}
            </div>
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="min-w-[--slide-item-width] bg-blue-100">
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
