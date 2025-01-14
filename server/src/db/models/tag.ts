import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import typeCache from "@/db/hooks/typeCache";

export interface TagAttributes {
  id: number;
  name: string;
  belong: number;
  icon_file_name?: string;
  time: Date;
  indexes: number;
}

export type TagPk = "id";
export type TagId = Tag[TagPk];
export type TagOptionalAttributes = "icon_file_name";
export type TagCreationAttributes = Optional<TagAttributes, TagOptionalAttributes>;

export class Tag extends Model<TagAttributes, TagCreationAttributes> implements TagAttributes {
  id!: number;
  name!: string;
  belong!: number;
  icon_file_name?: string;
  time!: Date;
  indexes!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Tag {
    return sequelize.define(
      "Tag",
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          comment: "ID",
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
          comment: "tag名称",
          unique: "name",
        },
        belong: {
          type: DataTypes.BIGINT,
          allowNull: false,
          comment: "所属Type的ID",
        },
        icon_file_name: {
          type: DataTypes.STRING(255),
          allowNull: true,
          comment: "ICON文件名称",
        },
        icon_url: {
          type: DataTypes.VIRTUAL,
          get(this) {
            let icon_file_name = this.getDataValue("icon_file_name");
            return icon_file_name ? `${process.env.cdn}/type/${icon_file_name}` : null;
          },
        },

        time: {
          type: DataTypes.DATE,
          allowNull: false,
          comment: "创建时间",
        },
        indexes: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "索引值",
        },
      },
      {
        tableName: "tag",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "name",
            unique: true,
            using: "BTREE",
            fields: [{ name: "name" }],
          },
        ],
        hooks: typeCache,
      }
    ) as typeof Tag;
  }
}
