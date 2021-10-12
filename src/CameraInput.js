export default function CameraInput() {
  return (
    <div>
      <label>
        <input
          type="file"
          accept="image/jpeg"
          id="pictureTest"
          multiple
          data-role="none"
        />
      </label>
    </div>
  );
}
