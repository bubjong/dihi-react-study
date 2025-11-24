export function ScrollToImage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div>
        <button>Image 1</button>
        <button>Image 2</button>
        <button>Image 3</button>
        <button>Image 4</button>
        <button>Image 5</button>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "1200px",
          overflowX: "auto",
        }}
      >
        <img
          src="https://picsum.photos/seed/random1/400/300"
          alt="random image"
        />
        <img
          src="https://picsum.photos/seed/random2/400/300"
          alt="random image"
        />
        <img
          src="https://picsum.photos/seed/random3/400/300"
          alt="random image"
        />
        <img
          src="https://picsum.photos/seed/random4/400/300"
          alt="random image"
        />
        <img
          src="https://picsum.photos/seed/random5/400/300"
          alt="random image"
        />
      </div>
    </div>
  );
}
