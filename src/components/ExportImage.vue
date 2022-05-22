<template>
  <vue-final-modal
    v-slot="{ close }"
    v-model="showModalExportImage"
    v-bind="$attrs"
    name="modal-export-image"
    lock-scroll="false"
    classes="flex justify-center items-center"
    content-class="xs:max-w-[30rem] sm:max-w-2xl w-full relative h-auto flex !flex-col bg-white"
  >
    <div class="p-2">
      <div class="max-w-2xl" id="build-pc" ref="printcontent">
        <div class="custom-export-header text-center bg-gray-200 p-4">
          <div>
            <img src="https://mscshop.vn/wp-content/themes/mscshop.vn/html/assets/images/logo1.jpg" alt="mscshop.vn" width="80" height="80" />
          </div>
          <h3 class="uppercase text-2xl mt-2 mb-0">xây dựng cấu hình pc</h3>
        </div>
        <div class="custom-export-content p-4">
          <div
            class="flex items-center mb-3"
            v-for="(product, index) in selectedPartPC?.selectedPart"
            :key="index"
          >
            <div class="max-w-[400px] flex items-center">
              <img :src="product.image" width="80" height="80" />
              <div class="ml-4">
                <h3 class="font-bold text-sm mt-0 mb-1 break-all">{{ product.name }}</h3>
                <p class="mt-0 mb-1 text-sm">Mã SP: {{ product.id }}</p>
                <p class="mt-0 mb-1 text-sm">
                  Bảo hành: {{ product.guarantee || '12 tháng' }}
                </p>
                <p class="mt-0 mb-1 text-sm font-semibold">
                  {{
                    new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(product.price) || 0
                  }}
                </p>
              </div>
            </div>
            <span class="flex-1 flex justify-end text-xl text-red-600 font-semibold">
              =
              {{
                new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(product.price) || 0
              }}</span
            >
          </div>
        </div>
        <div class="text-center">
          <p class="text-xl font-bold text-red-600">
            Tổng chi phí:
            {{
              new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(selectedPartPC?.totalPartPC) || 0
            }}
          </p>
        </div>
        <div class="p-2">
          <p class="text-sm">
            <span class="font-bold">Quý khách lưu ý: </span>
            Giá bán, khuyến mại của sản phẩm và tình trạng còn hàng có thể bị thay đổi bất
            cứ lúc nào mà không kịp báo trước.
            <br />
            Để biết thêm chi tiết, Quý khách vui lòng liên hệ MSCSHOP qua hotline: Điện
            thoại: 096.961.6882 - 088.688.6139 hoặc email: duong_startok@gmail.com <br />
            Một lần nữa MSCSHOP cảm ơn quý khách!
          </p>
        </div>
      </div>
      <div class="flex justify-end">
        <button class="text-sm bg-white" @click="close">Hủy</button>
        <button
          class="text-sm bg-white text-blue-600"
          @click.prevent="handleExportImage()"
        >
          Tải ảnh
        </button>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import html2canvas from 'html2canvas';

export default {
  name: 'ExportImage',
  props: ['selectedPartPC'],
  data() {
    return {
      showModalExportImage: false,
    };
  },
  methods: {
    async handleExportImage() {
      const el = this.$refs.printcontent;

      const options = {
        type: 'dataURL',
        useCORS: true,
        allowTaint: false,
      };
      const printCanvas = await html2canvas(el, options);

      const link = document.createElement('a');
      link.setAttribute('download', 'build-pc.jpg');
      link.setAttribute(
        'href',
        printCanvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream')
      );
      link.click();

      this.showModalExportImage = false;
    },
  },
};
</script>
