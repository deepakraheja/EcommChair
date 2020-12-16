export class Productkart {
    productID?: number;
    productName?: string;
    shortDetails?: string;
    description?: string;
    supplierId?: number;
    brandId?: number;
    qty?: number;
    price?: number;
    salePrice?: number;
    availableSize?: boolean;
    availableColors?: boolean;
    size?: string;
    color?: string;
    discount?: number;
    discountAvailable?: boolean;
    productAvailable?: boolean;
    featured?: boolean;
    latest?: boolean;
    onSale?: boolean;
    topSelling?: boolean;
    hotOffer?: boolean;
    subcatecode?: string;

    subcategoryName?: string;
    subCategoryID?: number;
    brandName?: string;
    rowID?: string;

    Type?: string;
    ImagePath?: string;
    Title?: string;
    SubTitle?: string;
    BannerImage?: string;
    frontImage?: string;

    productImg?: string[];
    productSizeColorId?: number;
    prodColor?: string[];
    prodsize?: string[];
    productSizeColor: string[];
    setType: number;
    setList: string[];
    productSizeSet?: string[];

    productSizeId: number;
    videoURL: string;
    setNo: number;
    piece: number;
    minimum: number;
    averagePrice: number

    seatingHeight: string;
    backSize: string;
    totalHeight: string;
    width: string;
    depth: string;
    overallDimension: string;
    assemblyType: string;
    seatMaterial: string;
    backMaterial: string;
    shippingPrice: number;
    businessPrice: number;
    gstAmount: number;
    businessBuyerGSTRate: number;
    averageRating: number;
    totalRating: number;
    guaranteeNotes: string;
    deliveryInformationNotes: string;
    suggestionNotes: string;
    userRecentlyProduct: any[];
    relatedProduct: any[];
    constructor(
        productID?: number,
        productName?: string,
        shortDetails?: string,
        description?: string,
        supplierId?: number,
        brandId?: number,
        qty?: number,
        price?: number,
        salePrice?: number,
        availableSize?: boolean,
        availableColors?: boolean,
        size?: string,
        color?: string,
        discount?: number,
        discountAvailable?: boolean,
        productAvailable?: boolean,
        featured?: boolean,
        latest?: boolean,
        onSale?: boolean,
        topSelling?: boolean,
        hotOffer?: boolean,
        subcatecode?: string,

        subcategoryName?: string,
        subCategoryID?: number,
        brandName?: string,
        rowID?: string,

        Type?: string,
        ImagePath?: string,
        Title?: string,
        SubTitle?: string,
        BannerImage?: string,
        frontImage?: string,
        productImg?: string[],
        productSizeColorId?: number,
        prodColor?: string[],
        prodsize?: string[],
        productSizeColor?: string[],
        setType?: number,
        productSizeId?: number,
        setList?: string[],
        productSizeSet?: string[],
        videoURL?: string,
        setNo?: number,
        piece?: number,
        minimum?: number,
        averagePrice?: number,
        seatingHeight?: string,
        backSize?: string,
        totalHeight?: string,
        width?: string,
        depth?: string,
        overallDimension?: string,
        assemblyType?: string,
        seatMaterial?: string,
        backMaterial?: string,
        shippingPrice?: number,
        businessPrice?: number,
        gstAmount?: number,
        businessBuyerGSTRate?: number,
        averageRating?: number,
        totalRating?: number,
        guaranteeNotes?: string,
        deliveryInformationNotes?: string,
        suggestionNotes?: string,
        userRecentlyProduct?: any[],
        relatedProduct?: any[]
    ) {
        this.productID = productID;
        this.productName = productName;
        this.shortDetails = shortDetails;
        this.description = description;

        this.supplierId = supplierId;
        this.brandId = brandId;
        this.qty = qty;
        this.price = price;
        this.salePrice = salePrice;
        this.availableSize = availableSize;
        this.availableColors = availableColors;
        this.size = size;
        this.color = color;
        this.discount = discount;
        this.discountAvailable = discountAvailable;

        this.productAvailable = productAvailable;
        this.featured = featured;
        this.latest = latest;

        this.onSale = onSale;
        this.topSelling = topSelling;
        this.hotOffer = hotOffer;
        this.subcatecode = subcatecode;

        this.subcategoryName = subcategoryName;
        this.subCategoryID = subCategoryID;
        this.brandName = brandName;
        this.rowID = rowID;

        this.Type = Type;
        this.ImagePath = ImagePath;
        this.SubTitle = SubTitle;
        this.BannerImage = BannerImage;
        this.frontImage = frontImage;
        this.productImg = productImg;
        this.productSizeColorId = productSizeColorId;
        this.prodColor = prodColor;
        this.prodsize = prodsize;
        this.productSizeColor = productSizeColor;
        this.setType = setType;
        this.productSizeId = productSizeId;
        this.setList = setList;
        this.productSizeSet = productSizeSet;
        this.videoURL = videoURL;
        this.setNo = setNo;
        this.piece = piece;
        this.minimum = minimum;
        this.averagePrice = averagePrice;

        this.seatingHeight = seatingHeight;
        this.backSize = backSize;
        this.totalHeight = totalHeight;
        this.width = width;
        this.depth = depth;
        this.overallDimension = overallDimension;
        this.assemblyType = assemblyType;
        this.seatMaterial = seatMaterial;
        this.backMaterial = backMaterial;

        this.shippingPrice = shippingPrice;
        this.businessPrice = businessPrice;
        this.gstAmount = gstAmount;
        this.businessBuyerGSTRate = businessBuyerGSTRate;
        this.averageRating = averageRating;
        this.totalRating = totalRating;
        this.guaranteeNotes = guaranteeNotes;
        this.deliveryInformationNotes = deliveryInformationNotes;
        this.suggestionNotes = suggestionNotes;
        this.userRecentlyProduct = userRecentlyProduct;
        this.relatedProduct = relatedProduct;
    }

}



