<template>
  <vue-final-modal
    v-slot="{ close }"
    v-model="showModalUser"
    v-bind="$attrs"
    name="modal-pc"
    lock-scroll="false"
    classes="flex justify-center items-center"
    content-class="xs:max-w-[20rem] sm:max-w-[30rem] w-full relative h-auto flex !flex-col bg-white"
  >
    <div>
      <div class="flex py-2 px-3 justify-between items-center bg-gray-200">
        <h4 class="m-0 font-medium">Lưu cấu hình</h4>
        <button class="!mb-0 !mr-0 outline-none bg-transparent border-0" @click="close">
          <i class="fa fa-times font-medium text-black text-lg" aria-hidden="true"></i>
        </button>
      </div>
      <form class="flex !flex-col pt-4 px-3" @submit.prevent="handleSubmit()">
        <div class="flex !flex-col mb-3">
          <label for="fullname" class="mb-1">Họ và tên</label>
          <input type="text" id="fullname" class="outline-none p-1 !mb-0" v-model="fullname" />
        </div>
        <div class="flex !flex-col mb-3">
          <label for="email" class="mb-1">Email</label>
          <input type="email" id="email" class="outline-none p-1 !mb-0" v-model="email" />
        </div>
        <div class="flex !flex-col mb-3">
          <label for="phone" class="mb-1">Số điện thoại</label>
          <input type="text" id="phone" class="outline-none p-1 !mb-0" v-model="phone" />
        </div>
        <div class="flex !flex-col">
          <label for="address" class="mb-1">Địa chỉ</label>
          <input type="text" id="address" class="outline-none p-1 !mb-0" v-model="address" />
        </div>
        <div class="flex justify-end mt-4 pb-2">
          <button
            class="mr-2 !mb-0 text-sm !bg-transparent text-gray-500"
            @click.prevent="close"
          >
            Hủy
          </button>
          <button type="submit" class="!bg-white !mb-0 text-sm text-blue-600">
            Gửi
          </button>
        </div>
      </form>
    </div>
  </vue-final-modal>
</template>

<script>
export default {
  name: 'ModalUser',
  data() {
    return {
      showModalUser: false,
      fullname: '',
      address: '',
      email: '',
      phone: '',
    };
  },
  watch: {
    showModalUser(newVal) {
      if (!newVal) {
        this.fullname = '';
        this.address = '';
        this.phone = '';
        this.email = '';
      }
    },
  },
  methods: {
    handleSubmit() {
      const data = {
        fullname: this.fullname,
        address: this.address,
        phone: this.phone,
        email: this.email,
      };
      this.$emit('save-build', data);
      this.showModalUser = false;
    },
  },
};
</script>
