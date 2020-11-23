export class productSizeColor {
    productSizeColorId?: number;
    productSizeId?: number;
    quantity?: number;
    productname?: string;
    productImg?: string[];
    productId?: number;
    salePrice?: number;
    selectedQty?: number;
    isSelected?: boolean;
    gstAmount?: number;
    discount?: number;
    totalPieces?: number;
    price?: number;
    setType?: number;
    additionalDiscountAmount?: number;
    moq?: number;
    isPersonal?: boolean;

    constructor(
        productSizeColorId?: number,
        productSizeId?: number,
        quantity?: number,
        productname?: string,
        productImg?: string[],
        productId?: number,
        salePrice?: number,
        selectedQty?: number,
        isSelected?: boolean,
        gstAmount?: number,
        totalPieces?: number,
        price?: number,
        setType?: number,
        additionalDiscountAmount?: number,
        moq?: number,
        isPersonal?: boolean
    ) {
        this.productSizeColorId = productSizeColorId;
        this.productSizeId = productSizeId;
        this.quantity = quantity;
        this.productname = productname;
        this.productImg = this.productImg;
        this.productId = this.productId;
        this.salePrice = this.salePrice;
        this.selectedQty = selectedQty;
        this.isSelected = isSelected;
        this.gstAmount = gstAmount;
        this.totalPieces = totalPieces;
        this.price = price;
        this.setType = setType;
        this.additionalDiscountAmount = additionalDiscountAmount;
        this.moq = moq;
        this.isPersonal = isPersonal;
    }

}



