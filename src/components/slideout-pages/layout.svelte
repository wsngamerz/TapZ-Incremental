<div class="w-full h-full flex flex-col gap-2">
  <div class="grid md:flex gap-2">
    <div class="flex-grow flex items-center justify-center bg-gray-600 rounded p-2">
      <h1 class="font-black text-3xl">
        <slot name="title">Title</slot>
      </h1>
    </div>

    <slot name="extra"/>
  </div>

  <div class="h-full overflow-y-scroll pr-2">
    <slot />
  </div>
</div>
