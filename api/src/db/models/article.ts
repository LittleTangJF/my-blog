import { DataTypes } from "sequelize";
import sequelize from "../config";
import { assets, cdn } from "@/store/assetsPath";
import cheerio from "cheerio";
import type { ArticleInstance } from "../types";
import xss from "xss";


export default sequelize.define<ArticleInstance>(
  "article",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    router: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: "router",
    },
    author: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(60),
      allowNull: false,
      set(value: string[]) {
        this.setDataValue("type", value.join(","));
      },
      get() {
        let type = this.getDataValue("type");
        return type.split(",");
      },
    },
    article: {
      type: DataTypes.TEXT,
      allowNull: false,
      set(value: string) {
        let $ = cheerio.load(value + "");
        $("img").each((index, data) => {
          $(data)
            .removeAttr("alt")
            .removeAttr("style")
            .removeAttr("contenteditable")
            .removeAttr("data-src");

          let _src: string =
            $(data).attr("src")?.replace(`${assets}image/`, "")?.replace(`${cdn}image/`, "") + "";
          $(data).attr("src", _src);
        });
        this.setDataValue("article", $("body").html() as string);
      },
      get() {
        let article: string = this.getDataValue("article");
        let $ = cheerio.load(article + "");
        $("img").each((index, data) => {
          //没有http说明是网络图片
          if (!$(data).attr("src")?.includes("http")) {
            let _src: string = `${cdn}image/${$(data).attr("src")}`;
            $(data)
              .attr("data-src", _src)
              .removeAttr("src")
              .attr("alt", this.getDataValue("type") as string);
          }
        });
        return $("body").html() as string;
      },
    },
    time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(),
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    view_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.VIRTUAL,
      get() {
        const article: string = this.getDataValue("article");
        let $ = cheerio.load(`<div>${article}</div>`);
        let _image: string | undefined = $("img").eq(0).attr("src");
        let _src = (_image + "").includes("http") ? _image : `${cdn}image/${_image}`;
        return _image ? _src : false;
      },
    },
    introduce: {
      type: DataTypes.VIRTUAL,
      get() {
        let article: string = this.getDataValue("article");
        let $ = cheerio.load(article);
        return $.text().substring(0, 280).trim();
      },
    },
  },
  {
    tableName: "article",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }],
      },
      {
        name: "router",
        unique: true,
        using: "BTREE",
        fields: [{ name: "router" }],
      },
    ],
  }
);
