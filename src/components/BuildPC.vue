<template>
  <div class="max-w-[1170px] mx-auto px-[15px] py-[40px]">
    <div class="mb-2">
      <h2 class="uppercase xs:text-sm lg:text-xl font-semibold">
        chọn linh kiện xây dựng cấu hình
      </h2>
      <span class="block border-b pt-1"></span>
    </div>
    <div class="flex justify-between items-center mb-6">
      <button
        class="bg-red-500 xs:text-sm md:text-sm outline-none xs:px-3 py-2 md:px-5 rounded text-white font-semibold uppercase"
        @click="resetBuildPC()"
      >
        Làm mới <i class="fa fa-refresh ml-1" aria-hidden="true"></i>
      </button>
      <p class="text-red-500 text-lg font-medium">
        Chi phí dự tính:
        {{
          new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(totalPartPC)
        }}
      </p>
    </div>

    <div class="flex flex-col">
      <div
        class="flex items-center border-b last:border-0 border-b-gray-500 odd:bg-gray-200"
        v-for="(product, index) in products"
        :key="product.id"
      >
        <div class="xs:max-w-[180px] md:max-w-xs w-full border-r-solid">
          <div class="text-sm font-semibold pl-5 py-4">
            {{ index + 1 }}. {{ product.title }}
          </div>
        </div>

        <div class="flex-1">
          <div class="px-5 py-2">
            <template
              v-if="
                selectedPart.length > 0 &&
                selectedPart.find((item) => item.key === product.key)
              "
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <img
                    class="w-[100px] h-[100px] object-cover"
                    :src="
                      selectedPart.find((item) => item.key === product.key).image ||
                      'https://via.placeholder.com/260'
                    "
                    alt=""
                  />
                  <div class="ml-5 flex flex-col max-w-lg">
                    <p class="font-semibold leading-4 mb-1 break-words">
                      {{ selectedPart.find((item) => item.key === product.key).name }}
                    </p>
                    <p class="mb-1 leading-4">
                      <span class="font-semibold"
                        >Mã SP:
                        {{
                          selectedPart.find((item) => item.key === product.key).id
                        }}</span
                      >
                    </p>
                    <p class="mb-1 leading-4">
                      <span class="font-semibold">Bảo hành:</span>
                      {{
                        selectedPart.find((item) => item.key === product.key).guarantee ||
                        '0 tháng'
                      }}
                    </p>
                    <p class="mb-1 leading-4">
                      <span class="font-semibold">Kho hàng:</span> Liên hệ
                    </p>
                  </div>
                </div>
                <div class="flex items-center">
                  <span class="font-bold"
                    >{{
                      new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(
                        selectedPart.find((item) => item.key === product.key).price
                      )
                    }}
                    x
                  </span>
                  <input
                    type="number"
                    min="1"
                    v-model="quantity"
                    class="border ml-2 px-1 !max-w-[60px] w-full border-black outline-none"
                    @change="
                      updateQuantity(
                        selectedPart.find((item) => item.key === product.key)
                      )
                    "
                  />
                  =
                  <span class="text-red-500 font-bold">
                    {{
                      new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(
                        selectedPart.find((item) => item.key === product.key).price *
                          quantity
                      )
                    }}</span
                  >
                </div>
                <button
                  @click="
                    removePartPC(
                      selectedPart.find((item) => item.key === product.key).key
                    )
                  "
                  class="text-red-500 !mb-0 !text-xl items-center bg-transparent flex border-0 border-transparent"
                >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
            </template>
            <button
              v-else
              @click="handleOpenModal(product)"
              class="bg-red-500 text-white font-semibold rounded-[4px] text-sm xs:p-1 md:py-2 md:px-3"
            >
              Chọn {{ product.title }} <i class="fa fa-plus ml-2 xs:hidden md:inline-block" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex mt-6 justify-between gap-1 xs:flex-wrap lg:flex-nowrap">
      <button
        class="bg-red-500 xs:w-full lg:w-1/5 text-sm xs:px-3 py-2 md:px-3 rounded text-white font-semibold uppercase"
        @click="openSaveBuildPC()"
        :disabled="selectedPart.length === 0"
      >
        Lưu cấu hình <i class="fa fa-floppy-o ml-1" aria-hidden="true"></i>
      </button>
      <button
        class="bg-red-500 xs:w-full lg:w-1/5 text-sm xs:px-3 py-2 md:px-3 rounded text-white font-semibold uppercase"
        @click="handleExportToExcel()"
        :disabled="selectedPart.length === 0"
      >
        Xuất file excel <i class="fa fa-file-excel-o ml-1" aria-hidden="true"></i>
      </button>
      <button
        class="bg-red-500 xs:w-full lg:w-1/5 text-sm xs:px-3 py-2 md:px-3 rounded text-white font-semibold uppercase"
        @click.prevent="openExportToImage()"
        :disabled="selectedPart.length === 0"
      >
        Xem và tải ảnh cấu hình <i class="fa fa-file-image-o ml-1" aria-hidden="true"></i>
      </button>
      <button
        class="bg-red-500 xs:w-full lg:w-1/5 text-sm xs:px-3 py-2 md:px-3 rounded text-white font-semibold uppercase"
        @click.prevent="handlePrint()"
        :disabled="selectedPart.length === 0"
      >
        Xem và in <i class="fa fa-print ml-1" aria-hidden="true"></i>
      </button>
      <button
        class="bg-red-500 xs:w-full lg:w-1/5 text-sm xs:px-3 py-2 md:px-3 rounded text-white font-semibold uppercase"
        @click="handleAddToCart()"
        :disabled="selectedPart.length === 0"
      >
        Thêm vào giỏ hàng <i class="fa fa-cart ml-1" aria-hidden="true"></i>
      </button>
    </div>
  </div>

  <ModalPC ref="modal" @addProduct="showData" :partID="partPCMData" />
  <ModalUser ref="modalUser" @saveBuild="handleSaveBuildPC" />
  <ExportImage
    ref="modalExportImage"
    :selectedPartPC="{
      selectedPart,
      totalPartPC,
    }"
  />
</template>

<script>
import axios from 'axios';
import ModalPC from './ModalPC.vue';
import ModalUser from './ModalUser.vue';
import ExportImage from './ExportImage.vue';

export default {
  name: 'BuildPC',
  components: {
    ModalPC,
    ModalUser,
    ExportImage,
  },
  data: () => ({
    products: [],
    quantity: 1,
    partPCMData: null,
    selectedPart: [],
    showModal: false,
  }),
  computed: {
    totalPartPC() {
      return this.selectedPart.reduce((total, item) => {
        return total + Number(item.price) * item.quantity;
      }, 0);
    },
  },
  created() {
    fetch('https://mscshop.vn/wp-json/wp/v3/cus-product', {
      method: 'GET',
      headers: {
        Authorization:
          'Basic ' +
          btoa(
            '5492d44e822df10d3626d1af0b7692871e7718d85214fe405958daec6871e53d:cs_300c7cc3f4de5bbfea7a918e95264a9f2be410db'
          ),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.products = [...data];
      });

    this.selectedPart = JSON.parse(localStorage.getItem('build-pc')) || [];
  },
  methods: {
    handleOpenModal(product) {
      this.$refs.modal.showModalPC = true;
      this.partPCMData = product.key;
    },
    showData(product) {
      this.selectedPart.push(product);
      window.localStorage.setItem('build-pc', JSON.stringify(this.selectedPart));
    },
    removePartPC(key) {
      if (confirm('Bạn muốn bỏ sản phẩm này ?')) {
        this.selectedPart = this.selectedPart.filter((item) => item.key !== key);
        window.localStorage.setItem('build-pc', JSON.stringify(this.selectedPart));
      }
    },
    resetBuildPC() {
      this.selectedPart = [];
      window.localStorage.clear();
    },
    openSaveBuildPC() {
      this.$refs.modalUser.showModalUser = true;
    },
    async handleSaveBuildPC(user_info) {
      try {
        const data = {
          partPC: this.selectedPart,
          totalPrice: this.totalPartPC,
          user_info,
        };
        await axios({
          url: 'https://mscshop.vn/wp-json/wp/v3/save-build',
          data,
          method: 'POST',
          headers: {
            Authorization:
              'Basic ' +
              btoa(
                'ck_fe0716604f94669b17f35ebaff4c47b31d56d8be:ck_fe0716604f94669b17f35ebaff4c47b31d56d8be'
              ),
          },
        });

        window.alert('Lưu cấu hình thành công');
      } catch (error) {
        window.alert('Lỗi xảy ra, vui lòng thử lại');
      } finally {
        this.resetBuildPC();
      }
    },
    async handleAddToCart() {
      try {
        const data = {
          partPC: this.selectedPart,
          totalPrice: this.totalPartPC,
        };
        await axios({
          url: 'https://mscshop.vn/add-to-cart',
          data,
          method: 'POST',
          headers: {
            Authorization:
              'Basic ' +
              btoa(
                'ck_fe0716604f94669b17f35ebaff4c47b31d56d8be:ck_fe0716604f94669b17f35ebaff4c47b31d56d8be'
              ),
          },
        });

        window.alert('Thêm vào giỏ hàng thành công');
      } catch (error) {
        window.alert('Lỗi xảy ra, vui lòng thử lại');
      } finally {
        this.resetBuildPC();
        window.location.reload()
      }
    },
    async handleExportToExcel() {
      const data = {
        partPC: this.selectedPart,
        totalPrice: this.totalPartPC,
      };
      const res = await axios({
        url: 'https://mscshop.vn/wp-json/wp/v3/download',
        method: 'POST',
        responseType: 'blob',
        data,
        headers: {
          Authorization:
            'Basic ' +
            btoa(
              '5492d44e822df10d3626d1af0b7692871e7718d85214fe405958daec6871e53d:cs_300c7cc3f4de5bbfea7a918e95264a9f2be410db'
            ),
        },
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'build-pc.xlsx');
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        URL.revokeObjectURL(url);
        link.parentNode.removeChild(link);
      }, 2000);

      this.resetBuildPC();
    },
    async handlePrint() {
      const data = {
        partPC: this.selectedPart,
        totalPrice: this.totalPartPC,
        user_info: {
          fullname: '',
          address: '',
          phone: '',
          email: '',
        },
      };
      const res = await axios({
        url: 'https://mscshop.vn/bao-gia',
        method: 'POST',
        responseType: 'blob',
        data,
        headers: {
          Authorization:
            'Basic ' +
            btoa(
              '5492d44e822df10d3626d1af0b7692871e7718d85214fe405958daec6871e53d:cs_300c7cc3f4de5bbfea7a918e95264a9f2be410db'
            ),
        },
      });

      const blob = new Blob([res.data], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    },
    openExportToImage() {
      this.$refs.modalExportImage.showModalExportImage = true;
    },
    updateQuantity(val) {
      const newItem = {
        ...val,
        quantity: this.quantity,
      };
      const idxItem = this.selectedPart.findIndex((item) => item.id === newItem.id);
      this.selectedPart.splice(idxItem, 1, newItem);
    },
  },
};
</script>
